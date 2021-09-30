import React, { useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loading from "./Loading";

const demoImage =
	"https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
	const count = simplified ? 6 : 12;
	const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
	const { data: cryptoNews, isFetching: isFetchingNews } =
		useGetCryptoNewsQuery({ count, newsCategory });

	const { data: cryptosList, isFetching } = useGetCryptosQuery(100);

	if (simplified?.value) {
		return "Loading...";
	}

	return (
		<>
			{isFetching ? (
				<Loading />
			) : (
				!simplified && (
					<div>
						<select
							className="mt-5 py-2 px-4 bg-white rounded-btn"
							placeholder="Select a Crypto"
							onChange={(e) => setNewsCategory(e.target.value)}
						>
							<option value="Cryptocurrencie">Cryptocurrency</option>
							{cryptosList?.data?.coins.map((coin) => (
								<option className="p-4" key={coin.name} value={coin.name}>
									{coin.name}
								</option>
							))}
						</select>
					</div>
				)
			)}

			<div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
				{isFetchingNews ? (
					<Loading />
				) : (
					<>
						{cryptoNews?.value.map((news) => (
							<a
								key={news.url}
								href={news.url}
								target="_blank"
								rel="noreferrer"
							>
								<div className="shadow-md rounded-btn overflow-hidden h-full bg-white">
									<img
										className="w-full h-40 object-cover"
										src={news?.image?.thumbnail?.contentUrl || demoImage}
										alt={news.url}
									/>
									<div className="p-4">
										<h3 className="font-bold mb-2">
											{news.name.length > 70
												? `${news.name.substring(0, 70)}...`
												: news.name}
										</h3>
										<p>
											{news.description.length > 100
												? `${news.description.substring(0, 100)}...`
												: news.description}
										</p>
										<div className="flex justify-between mt-5">
											<div className="flex items-center">
												<img
													className="w-6 rounded-full object-cover"
													src={
														news.provider[0]?.image?.thumbnail?.contentUrl ||
														demoImage
													}
													alt={news.url}
												/>
												<span className="text-xs ml-2">
													{news.provider[0]?.name}
												</span>
											</div>
											<span className="text-xs">
												{moment(news.datePublished).startOf("ss").fromNow()}
											</span>
										</div>
									</div>
								</div>
							</a>
						))}
					</>
				)}
			</div>
		</>
	);
};

export default News;
