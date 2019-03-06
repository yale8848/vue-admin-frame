const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

console.log(' #### isProduction '+isProduction);

module.exports = {
	///production-sub-path/
	publicPath: process.env.NODE_ENV === 'production' ?
		'/' : '/',
	outputDir: 'dist',
	filenameHashing:true,
	productionSourceMap: false,
	configureWebpack: config => {
		config.externals = {
			'vue': 'Vue',
			'vue-router': 'VueRouter',
			'ElementUI': 'ELEMENT',
			'axios': 'axios',
			'vuex': 'Vuex'
		};

		if (isProduction) {
			
	 		config.plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							warnings: false,
							drop_debugger: true,
							drop_console: true,
						},
					},
					sourceMap: false,
					parallel: true,
				}));
		
			
			config.plugins.push(new CompressionWebpackPlugin({
				algorithm: 'gzip',
				test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
				threshold: 10240,
				minRatio: 0.8
			})) 
		}
	}
}
