import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	FaBitcoin,
	FaHome,
	FaExchangeAlt,
	FaRegNewspaper,
	FaEthereum,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<nav className="bg-primary relative py-4">
			<div className="container mx-auto justify-between flex text-text items-center">
				<Link to="/">
					<div className="flex items-center">
						<FaBitcoin size="2rem" />
						<div className="ml-2">Crypto World</div>
					</div>
				</Link>
				<div
					className="sm:hidden"
					onClick={() => {
						setShowMenu(!showMenu);
					}}
				>
					<GiHamburgerMenu size="1.4rem" />
				</div>
				<ul
					className={`${
						showMenu ? "absolute" : "hidden"
					} bg-primary sm:relative top-full right-0 sm:flex`}
				>
					<NavLink path="/" name="Home" icon={FaHome} />
					<NavLink
						path="/cryptocurrencies"
						name="Cryptocurrencies"
						icon={FaEthereum}
					/>
					<NavLink path="/exchanges" name="Exchanges" icon={FaExchangeAlt} />
					<NavLink path="/news" name="News" icon={FaRegNewspaper} />
				</ul>
			</div>
		</nav>
	);
};

const NavLink = ({ path, name, icon: Icon }) => (
	<li>
		<Link to={path}>
			<div className="flex items-center px-3 py-2 rounded-btn hover:bg-secondary">
				<Icon />
				<h3 className="m-0 ml-2">{name}</h3>
			</div>
		</Link>
	</li>
);

export default Navbar;
