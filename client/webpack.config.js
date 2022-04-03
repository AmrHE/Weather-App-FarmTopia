const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
	resolve: {
		fallback: {
			buffer: false,
			stream: false,
			util: false,
			crypto: false,
		},
	},
	plugins: [new NodePolyfillPlugin()],
};
