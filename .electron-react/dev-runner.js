const sayHello = require('./utils/sayHello')
const startRenderer = require('./startRenderer')
const startMain = require('./startMain')
const startElectron = require('./startElectron')
const init = async () => {
	sayHello()
	try {
		await startRenderer()
		await startMain()
		startElectron()
	} catch (err) {
		console.error(err)
	}
}
init()
