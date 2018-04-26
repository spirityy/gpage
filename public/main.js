const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');
const BrowserWindow = electron.BrowserWindow;
const {dialog} = require('electron');

let mainWindow;
process.env.NODE_ENV = 'development';

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});

  if (process.env.NODE_ENV === "production") {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  } else if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  }
  /*
  app.setAboutPanelOptions({
    applicationName: 'Mook',
    applicationVersion: '0.0.1',
  })
  */
  mainWindow.on('closed', () => mainWindow = null);
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
