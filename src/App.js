import React from "react";
import { Switch, Route } from "react-router-dom";
import {
	Navbar,
	HomePage,
	Exchanges,
	Cryptocurrencies,
	CryptoDetails,
	News,
} from "./components";
import Footer from "./components/Footer";

const App = () => {
	return (
		<>
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<div className="container">
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route exact path="/exchanges">
							<Exchanges />
						</Route>
						<Route exact path="/cryptocurrencies">
							<Cryptocurrencies />
						</Route>
						<Route exact path="/crypto/:coinId">
							<CryptoDetails />
						</Route>
						<Route exact path="/news">
							<News />
						</Route>
					</Switch>
				</div>
				<div className="footer">
					<Footer />
				</div>
			</div>
		</>
	);
};

export default App;
