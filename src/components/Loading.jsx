import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
	return (
		<div className="flex justify-center align-center">
			<div className="text-primary animate-spin my-10">
				<AiOutlineLoading3Quarters size="2rem" />
			</div>
		</div>
	);
};

export default Loading;
