const withPWA = require("next-pwa");

module.exports = withPWA({
	reactStrictMode: true,
	images: {
		domains: ["pbs.twimg.com"],
	},
	pwa: {
		dest: "public",
	},
});
