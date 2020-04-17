'use strict'

import {app, BrowserWindow, Menu, ipcMain, shell} from 'electron'
import '../renderer/store'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, calendarWin
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

//  创建主窗口
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 500,
    useContentSize: true,
    width: 300,
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
function openWindow () {
  calendarWin = new BrowserWindow({
    width: 1200,
    height: 700,
    parent: mainWindow, // win是主窗口
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
//  最小化
ipcMain.on('min', e => mainWindow.minimize())
//  最大化
ipcMain.on('max', e => mainWindow.maximize())
//  关闭
ipcMain.on('close', e => mainWindow.close())

// 打开新窗体
ipcMain.on('openWindow', e => {
  mainWindow.hide()
  openWindow()
})

// 重新登录
ipcMain.on('toLogin', (e, url) => {
  calendarWin.hide()
  mainWindow.show()
})

// 用系统默认浏览器打开地址
ipcMain.on('openUrl', (e, url) => {
  shell.openExternal(url)
})

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
