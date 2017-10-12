const electron = require('electron')
const { spawn } = require('child_process')
const chalk = require('chalk')
const path = require('path')
function electronLog(data, color) {
	let log = ''
	data = data.toString().split(/\r?\n/)
	data.forEach(line => {
		log += `  ${line}\n`
	})
	if (/[0-9A-z]+/.test(log)) {
		console.log(
			chalk[color].bold('┏ Electron -------------------') +
				'\n\n' +
				log +
				chalk[color].bold('┗ ----------------------------') +
				'\n'
		)
	}
}

function startElectron() {
	electronProcess = spawn(electron, [
		'--inspect=5858',
		path.join(__dirname, '../dist/electron/main.js')
	])

	electronProcess.stdout.on('data', data => {
		electronLog(data, 'blue')
	})
	electronProcess.stderr.on('data', data => {
		electronLog(data, 'red')
	})

	electronProcess.on('close', () => {
		process.exit()
	})
}

module.exports = startElectron
