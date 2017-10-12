const rendererConfig = require('./webpack.renderer.config')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const path = require('path')
const logStats = require('./utils/logStats')
let hotMiddleware
const startRenderer = () => {
	return new Promise((resolve, reject) => {
		const compiler = webpack(rendererConfig)
		hotMiddleware = webpackHotMiddleware(compiler, {
			log: false,
			heartbeat: 2500
		})

		compiler.plugin('done', stats => {
			logStats('Renderer', stats)
		})

		const server = new WebpackDevServer(compiler, {
			hot: true,
			stats: {
				colors: true
			},
			historyApiFallback: true,
			contentBase: path.join(__dirname, '../dist'),
			quiet: true,
			before(app, ctx) {
				app.use(hotMiddleware)
				ctx.middleware.waitUntilValid(() => {
					resolve()
				})
			}
		})

		server.listen(9080)
	})
}

module.exports = startRenderer
