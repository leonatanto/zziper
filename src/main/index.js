import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'

// Function to check the latest version from GitHub Releases
async function checkLatestVersionFromGitHub() {
  try {
    const response = await axios.get(
      'https://api.github.com/repos/leonatanto/zziper/releases/latest'
    )
    const latestVersion = response.data.tag_name
    return latestVersion
  } catch (error) {
    console.error('Error checking latest version from GitHub:', error)
    return null
  }
}

// Function to compare the latest version with the currently installed version
function compareVersions(currentVersion, latestVersion) {
  return currentVersion === latestVersion
}

// Function to get the current version from package.json
function getCurrentVersionFromPackageJson() {
  return '1.0.10'
}

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', async () => {
    mainWindow.show()
    autoUpdater.checkForUpdates()

    // Check for the latest version from GitHub Releases
    const currentVersion = getCurrentVersionFromPackageJson()
    const latestVersion = await checkLatestVersionFromGitHub().catch((error) => {
      console.error('Error checking latest version from GitHub:', error)
      return null
    })

    if (latestVersion && !compareVersions(currentVersion, latestVersion)) {
      // Prompt the user to update when a new version is available
      dialog
        .showMessageBox(mainWindow, {
          type: 'info',
          title: 'Update Available',
          message: 'A new version of the application is available. Do you want to update now?',
          buttons: ['Update', 'Later'],
          defaultId: 0,
          cancelId: 1
        })
        .then((response) => {
          if (response.response === 0) {
            autoUpdater.quitAndInstall()
          }
        })
        .catch((error) => {
          console.error('Error showing update prompt:', error)
        })
    }
  })

  autoUpdater.on('update-downloaded', () => {
    // Handle update downloaded event if needed
  })

  // Handle quitAndInstall event
  ipcMain.on('quitAndInstall', () => {
    autoUpdater.quitAndInstall()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'), { hash: 'home' })
  }
}

// Set app user model id for windows
electronApp.setAppUserModelId('com.electron')

// Default open or close DevTools by F12 in development
app.on('browser-window-created', (_, window) => {
  optimizer.watchWindowShortcuts(window)
})

// IPC test
ipcMain.on('ping', () => console.log('pong'))

// Create window when Electron has finished initialization
app.whenReady().then(createWindow)

// On macOS it's common to re-create a window when the dock icon is clicked and there are no other windows open.
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
