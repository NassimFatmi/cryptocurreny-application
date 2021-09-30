import React from "react";
import { Line } from "react-chartjs-2";
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
	const coinPrice = [];
	const coinTimestamp = [];

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		coinPrice.push(coinHistory?.data?.history[i].price);
	}

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		coinTimestamp.push(
			new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
		);
	}

	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: "Price In USD",
				data: coinPrice,
				fill: false,
				backgroundColor: "#4C1D95",
				borderColor: "#4C1D95",
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return (
		<div>
			<div className="flex justify-between items-start mt-5">
				<h2 className="text-lg font-bold">{coinName} price chart</h2>
				<div className="flex">
					<h5 className="mr-5">{coinHistory?.data?.change}%</h5>
					<h5>
						Current {coinName} Price: $ {currentPrice}
					</h5>
				</div>
			</div>
			<Line data={data} option={options} />
		</div>
	);
};

export default LineChart;
