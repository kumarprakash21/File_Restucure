const { app, BrowserWindow, Menu, session } = require('electron');
const path = require('path');

const isDev = process.argv.includes('--enable-logging');

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 960,
    minHeight: 700,
    title: 'FileForge',
    backgroundColor: '#fbfaf8',
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });

  window.loadFile(path.join(__dirname, 'index.html'));
  window.once('ready-to-show', () => window.show());

  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  if (isDev) window.webContents.openDevTools();
}

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeRequest({ urls: ['http://*/*', 'https://*/*'] }, (_details, callback) => {
    callback({ cancel: true });
  });

  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    callback(permission === 'notifications');
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'FileForge',
      submenu: [
        { role: 'about', label: 'About FileForge' },
        { type: 'separator' },
        { role: 'quit', label: 'Exit FileForge' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', label: 'Reload' },
        { role: 'togglefullscreen', label: 'Toggle Full Screen' },
        { type: 'separator' },
        { role: 'toggledevtools', label: 'Developer Tools', visible: isDev }
      ]
    },
    {
      label: 'Help',
      submenu: [{ label: 'FileForge works locally in this window', enabled: false }]
    }
  ]));

  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
