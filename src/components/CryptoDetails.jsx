import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { BiDollarCircle, BiMoney } from "react-icons/bi";
import {
	AiOutlineFieldNumber,
	AiFillThunderbolt,
	AiOutlineTrophy,
	AiOutlineFund,
	AiOutlineCheckCircle,
	AiOutlineStop,
	AiOutlineExclamationCircle,
} from "react-icons/ai";

import LineChart from "./LineChart";
import Loading from "./Loading";

const CryptoDetails = () => {
	const { coinId } = useParams();
	const [timePeriod, setTimePeriod] = useState("7d");

	const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
	const { data: coinHistory } = useGetCryptoHistoryQuery({
		coinId,
		timePeriod,
	});
	const cryptoDetails = data?.data?.coin;
	if (isFetching) return <Loading />;

	const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

	const stats = [
		{
			title: "Price to USD",
			value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
			icon: <BiDollarCircle />,
		},
		{
			title: "Rank",
			value: cryptoDetails.rank,
			icon: <AiOutlineFieldNumber />,
		},
		{
			title: "24h Volume",
			value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
			icon: <AiFillThunderbolt />,
		},
		{
			title: "Market Cap",
			value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
			icon: <BiDollarCircle />,
		},
		{
			title: "All-time-high(daily avg.)",
			value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
			icon: <AiOutlineTrophy />,
		},
	];

	const genericStats = [
		{
			title: "Number Of Markets",
			value: cryptoDetails.numberOfMarkets,
			icon: <AiOutlineFund />,
		},
		{
			title: "Number Of Exchanges",
			value: cryptoDetails.numberOfExchanges,
			icon: <BiMoney />,
		},
		{
			title: "Aprroved Supply",
			value: cryptoDetails.approvedSupply ? (
				<AiOutlineCheckCircle />
			) : (
				<AiOutlineStop />
			),
			icon: <AiOutlineExclamationCircle />,
		},
		{
			title: "Total Supply",
			value: `$ ${millify(cryptoDetails.totalSupply)}`,
			icon: <AiOutlineExclamationCircle />,
		},
		{
			title: "Circulating Supply",
			value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
			icon: <AiOutlineExclamationCircle />,
		},
	];

	return (
		<div>
			<h2 className="text-3xl font-bold my-5">
				{cryptoDetails.name} ({cryptoDetails.slug}) Price
			</h2>
			<p>
				{cryptoDetails.name} live price in US dollars. View statistics, market
				Cap and suplly
			</p>
			<select
				defaultValue="7d"
				className="mt-5 py-2 px-4 bg-white rounded-btn"
				placeholder="Select Time Period"
				onChange={(e) => setTimePeriod(e.target.value)}
			>
				{time.map((date) => (
					<option key={date}>{date}</option>
				))}
			</select>
			<LineChart
				coinHistory={coinHistory}
				currentPrice={millify(cryptoDetails.price)}
				coinName={cryptoDetails.name}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="mt-10">
					<h3 className="font-bold text-xl mb-3">
						{cryptoDetails.name} Value Statistics
					</h3>
					<p className="mb-5">
						An overview showing the stats of {cryptoDetails.name}
					</p>
					{stats.map(({ icon, title, value }) => (
						<div
							key={title}
							className="flex bg-white rounded-btn mb-2 shadow-md items-center justify-between py-3 px-4"
						>
							<div className="flex items-center">
								{icon}
								<p className="ml-2">{title}</p>
							</div>
							<span>{value}</span>
						</div>
					))}
				</div>
				<div className="mt-10">
					<h3 className="font-bold text-xl mb-3">Other statistics</h3>
					<p className="mb-5">
						An overview showing the stats of all cryptocurrencies
					</p>
					{genericStats.map(({ icon, title, value }) => (
						<div
							key={title}
							className="flex bg-white rounded-btn mb-2 shadow-md items-center justify-between py-3 px-4"
						>
							<div className="flex items-center">
								{icon}
								<p className="ml-2">{title}</p>
							</div>
							<span>{value}</span>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="mt-10">
					<h3 className="font-bold text-xl mb-3">
						What is {cryptoDetails.name}
					</h3>
					{HTMLReactParser(cryptoDetails.description)}
				</div>
				<div className="my-10">
					<h3 className="font-bold text-xl mb-3">{cryptoDetails.name} Links</h3>
					{cryptoDetails.links.map((link) => (
						<div
							key={link.name}
							className="flex bg-white rounded-btn mb-2 shadow-md items-center justify-between py-3 px-4"
						>
							<h5 className="font-bold">{link.type}</h5>
							<a
								href={link.url}
								className="text-secondary"
								target="_blank"
								rel="noreferrer"
							>
								{link.name}
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CryptoDetails;
