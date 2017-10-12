const path = require('path')
const webpack = require('webpack')
const mainConfig = require('./webpack.main.config')
const logStats = require('./utils/logStats')
function startMain() {
	return new Promise((resolve, reject) => {
		mainConfig.entry.main = [
			path.join(__dirname, '../src/main/index.dev.js')
		].concat(mainConfig.entry.main)
		webpack(mainConfig, (err, stats) => {
			if (err || stats.hasErrors()) {
				reject(new Error('main process compiler error'))
				return
			}
			resolve()
		})
	})
}

module.exports = startMain
