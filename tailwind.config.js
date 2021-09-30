const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			colors: {
				primary: colors.coolGray[700],
				secondary: colors.coolGray[400],
				light: colors.coolGray[200],
				text: "#ffffff",
			},
			borderRadius: {
				btn: "0.375rem",
				card: "0.375rem",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
