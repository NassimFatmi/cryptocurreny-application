import millify from "millify";
import React, { useState, useEffect } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [searchItem, setSearchItem] = useState("");
	const [cryptos, setCryptos] = useState([]);

	useEffect(() => {
		setCryptos(cryptosList?.data?.coins);
	}, [cryptosList]);

	useEffect(() => {
		const filtredList = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchItem.toLowerCase())
		);
		setCryptos(filtredList);
		// eslint-disable-next-line
	}, [searchItem]);

	if (isFetching) return <Loading />;

	return (
		<>
			{!simplified && (
				<h2 className="text-3xl font-bold my-5">Top 100 Cryptocurrencies</h2>
			)}
			{!simplified && (
				<div className="mt-5 text-center">
					<input
						type="text"
						placeholder="Search"
						className="py-3 px-4 border-2 rounded-btn w-full sm:w-1/2 focus:ring focus:ring-light focus:outline-none"
						onChange={(e) => setSearchItem(e.target.value)}
					/>
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
				{cryptos?.map((coin) => (
					<Link key={coin.id} to={`/crypto/${coin.id}`}>
						<div className="bg-white rounded-btn p-5 shadow-md hover:shadow-xl cursor-pointer">
							<div className="flex items-center justify-between pb-3 border-b-2">
								<h3>{coin.rank + ". " + coin.name}</h3>
								<img className="w-10" src={coin.iconUrl} alt={coin.id} />
							</div>
							<div className="mt-2">
								<p className="mb-2">Price: {millify(coin.price)}</p>
								<p className="mb-2">Market Cap: {millify(coin.marketCap)}</p>
								<p>Daily Change: {millify(coin.change)}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default Cryptocurrencies;
