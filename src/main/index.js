'use strict'

import {app, BrowserWindow, Menu, ipcMain} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, calendarWin;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

//  创建主窗口
function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 520,
    useContentSize: true,
    width: 680,
    center: true,
    frame: false,
    resizable: true, // 可否缩放
    movable: true, // 可否移动
    webPreferences: {webSecurity: false}
  })
  mainWindow.loadURL(winURL)
  /* 隐藏electron创听的菜单栏 */
  Menu.setApplicationMenu(null)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 创建主业务窗口方法
function openCalendarWindow() {
  calendarWin = new BrowserWindow({
    width: 1200,
    height: 700,
    parent: mainWindow, //win是主窗口
    center: true,
    frame: false,
    resizable: true, // 可否缩放
    movable: true, // 可否移动
    webPreferences: {
      nodeIntegration: true
    }
  })
  calendarWin.loadURL(winURL + '#/home')
  calendarWin.on('closed', () => {
    calendarWin = null
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

ipcMain.on('min', e => mainWindow.minimize())
ipcMain.on('max', e => mainWindow.maximize())
ipcMain.on('close', e => mainWindow.close())

ipcMain.on('openCalendarWindow', e =>
  mainWindow.hide()
  openCalendarWindow()
)
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

