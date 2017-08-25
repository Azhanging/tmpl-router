var webpack = require('webpack');
//路径模块
var path = require('path');
var url = require('url');
//压缩模块插件
var uglifyjs = require('uglifyjs-webpack-plugin');
//生成页面
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	//文件起始路径
	/*context: path.resolve(__dirname, 'src'),*/
	//入口
	entry: {
		'tmpl-router': './src/index.js',
		'tmpl-router.min': './src/index.js'
	},
	//出口
	output: {
		path: path.join(__dirname, '/dist'),
		filename: './js/[name].js',
		publicPath: '/dist', //公共打包的默认路径
		libraryTarget: 'umd',
		umdNamedDefine: true,
		library: "TmplRourt"
	},
	//模块处理器
	module: {
		//loader预处理设置
		rules: [{
			test: /\.js$/,
			use: [
				'babel-loader?presets[]=es2015'
			]
		}, {
			test: /\.html$/,
			loader: 'html-loader'
		}]
	},
	//loader模块文件解析
	resolveLoader: {
		moduleExtensions: ["-loader"]
	},
	//map文件生成
	//	devtool: 'source-map',
	plugins: [
		new webpack.BannerPlugin(`
			tmpl-router.js v1.0.2
			(c) 2016-2017 Blue
			Released under the MIT License.
			https://github.com/azhanging/tmpl-router
			time:${new Date()}
		`),
		new uglifyjs({
			mangle: true,
			include: /\.min\.js$/
		}),
		new HtmlWebpackPlugin({
			title: 'tmpl-router',
			filename: '/html/new-page.html',
			template: 'dist/html/page.html',
			hash: true,
			showErrors: true,
			inject: 'body'
		})
	],
	//配置服务器
	devServer: {
		publicPath: "/",
		watchContentBase: true,
		port: 8880,
		open: true,
		openPage: '/dist/html/new-page.html'

	}
}