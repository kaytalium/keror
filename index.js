'use strict'
//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const electron = require('electron')
// Module to control application life.
const app = electron.app

const isDev = require('electron-is-dev');  // this is required to check if the app is running in development mode. 
const { appUpdater } = require('./autoUpdater');

// Module to create native browser window.
let BrowserWindow = electron.BrowserWindow
let loadingScreen = electron.BrowserWindow
let windowParams = {
  title: 'Keror',
  width: 1020,
  height: 720,
  minWidth: 720,
  minHeight: 720,
  backgroundColor: '#000',//#312450
  show: false,
  webpreferences: {
    overlayScrollbars: true,
  }
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Funtion to check the current OS. As of now there is no proper method to add auto-updates to linux platform.
function isWindowsOrmacOS() {
  return process.platform === 'darwin' || process.platform === 'win32';
}

//Development mode only 
require('electron-reload')(__dirname);

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow(windowParams)

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  // const page = mainWindow.webContents;

  // page.once('did-frame-finish-load', () => {

  // });

  // mainWindow.webContents.on('did-finish-load', () => {
  //   console.log('did-finish-load')
  //   const checkOS = isWindowsOrmacOS();

  //   if (checkOS && !isDev) {
  //     // Initate auto-updates on macOs and windows
  //     appUpdater();
  //   }

  //   if (loadingScreen) {
  //     let loadingScreenBounds = loadingScreen.getBounds();
  //     mainWindow.setBounds(loadingScreenBounds);
  //     loadingScreen.close();
  //   }
  // });

  mainWindow.once('ready-to-show', () => {

    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show();
    mainWindow.maximize();
    mainWindow.focus();
    console.log('ready-to-show')
  })

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  require('./menu/mainmenu')
}

function createLoadingScreen() {
  loadingScreen = new BrowserWindow(Object.assign(windowParams, { parent: mainWindow, modal: true, show: false }));
  loadingScreen.loadURL('file://' + __dirname + '/app/loading.html');
  loadingScreen.on('closed', () => { loadingScreen = null; mainWindow.show() });
  loadingScreen.show()
  // loadingScreen.webContents.on('did-finish-load', () => {
  //   loadingScreen.show();
  // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createLoadingScreen()
  createWindow()


})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.