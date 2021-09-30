import React from "react";
import {
	AiFillHeart,
	AiOutlineGithub,
	AiOutlineInstagram,
	AiOutlineLinkedin,
} from "react-icons/ai";
const Footer = () => {
	return (
		<div className="bg-gray-700 text-text py-5">
			<div className="flex items-center justify-center mb-3">
				Crafted with <AiFillHeart color="red" /> by{" "}
				<a
					href="https://nassimfatmi.github.io/my_portfolio/"
					rel="noreferrer noopener"
					className="ml-2 text-light"
				>
					Nassim Fatmi
				</a>
			</div>
			<ul className="flex justify-center">
				<li className="mr-5">
					<a
						href="https://github.com/NassimFatmi"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2"
					>
						<AiOutlineGithub /> Github
					</a>
				</li>
				<li className="mr-5">
					<a
						href="https://www.instagram.com/nassim.xii/"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2"
					>
						<AiOutlineInstagram />
						Instagram
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/nassim-fatmi-dz/"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2"
					>
						<AiOutlineLinkedin />
						LinkedIn
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Footer;
