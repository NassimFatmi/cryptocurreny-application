import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "./";
import Loading from "./Loading";

const HomePage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);

	if (isFetching) {
		return <Loading />;
	}

	const globalStats = data?.data?.stats;

	return (
		<>
			<h2 className="text-3xl font-bold my-5">Global Crypto Stats</h2>
			<div className="grid grid-cols-2 gap-5">
				<StatsCard name="Total Cryptocurrencies" stat={globalStats.total} />
				<StatsCard
					name="Total Exchages"
					stat={millify(globalStats.totalExchanges)}
				/>
				<StatsCard
					name="Total Market Cap"
					stat={millify(globalStats.totalMarketCap)}
				/>
				<StatsCard
					name="Total 24h Volume"
					stat={millify(globalStats.total24hVolume)}
				/>
				<StatsCard
					name="Total Markets"
					stat={millify(globalStats.totalMarkets)}
				/>
			</div>

			<div className="flex justify-between items-center mt-10">
				<h2 className="text-3xl font-bold my-5">
					Top 10 Cryptocurrencies in the World
				</h2>
				<Link
					to="/cryptocurrencies"
					className="text-primary font-bold px-3 py-2 rounded-btn hover:bg-light"
				>
					Show more
				</Link>
			</div>
			<Cryptocurrencies simplified />

			<div className="flex justify-between items-center mt-10">
				<h2 className="text-3xl font-bold my-5">Latest Crypto News</h2>
				<Link
					to="/news"
					className="text-primary font-bold px-3 py-2 rounded-btn hover:bg-light"
				>
					Show more
				</Link>
			</div>
			<News simplified />
		</>
	);
};
const StatsCard = ({ name, stat }) => (
	<div className="py-2 px-4 bg-white rounded-card shadow-md">
		<h3 className="text-sm sm:text-lg m-0 mb-3">{name}</h3>
		<div className="text-lg sm:text-xl">{stat}</div>
	</div>
);

export default HomePage;
