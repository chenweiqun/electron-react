import { app, BrowserWindow, ipcMain } from 'electron'
let winURL = ''
if (process.env.NODE_ENV === 'development') {
  winURL = `http://localhost:9080`
} else {
  winURL = `file://${__dirname}/index.html`
}

let mainWindow
const createWindow = () => {
  console.log('start')
  mainWindow = new BrowserWindow({
    height: 670,
    width: 1000,
    minWidth: 1000,
    minHeight: 670,
    frame: true,
    backgroundColor: '#F0F0F0',
    webPreferences: {
      webSecurity: false
    }
  })
  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
