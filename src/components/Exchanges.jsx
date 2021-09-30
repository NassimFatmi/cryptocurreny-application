import React from "react";
import millify from "millify";
import { useGetExchangesQuery } from "../services/cryptoApi";
import HTMLReactParser from "html-react-parser";
import Loading from "./Loading";

const Exchanges = () => {
	const { data, isFetching } = useGetExchangesQuery();
	if (isFetching) return <Loading />;
	return (
		<div>
			<h2 className="text-3xl font-bold my-5">Cryptocurrencies exchanges</h2>
			<div className="flex justify-between mb-3">
				<span className="flex-1">Exchanges</span>
				<span className="flex-1">24h Trade Volume</span>
				<span className="flex-1">Market</span>
				<span>Change</span>
			</div>
			{data?.data?.exchanges.map((exchange) => (
				<details className="bg-white rounded-btn mb-2 shadow-sm">
					<summary className="hover:shadow-md px-4 flex gap-2 items-center justify-between bg-white rounded-btn h-14 mb-3">
						<div className="flex-1 flex items-center overflow-hidden">
							{exchange.rank}.
							<img className="w-6 mx-1" src={exchange.iconUrl} alt="" />
							{exchange.name}
						</div>
						<div className="sm:flex-1">${millify(exchange.volume)}</div>
						<div className="sm:flex-1">{millify(exchange.numberOfMarkets)}</div>
						<div>{millify(exchange.marketShare)}%</div>
					</summary>
					<div className="px-10 py-3">
						{exchange.description !== null
							? HTMLReactParser(exchange.description)
							: "No description found.."}
					</div>
				</details>
			))}
		</div>
	);
};

export default Exchanges;
