/* tslint:disable:no-console */
import {
  app,
  protocol,
  BrowserWindow,
  Menu,
} from 'electron';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow;

function createWindow() {

  console.log('createWindow in bootstrap.main.ts');
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 1920,
    width: 1080,
    webPreferences: {
      // This following windows parameters should be considered before 
      // deploying this electron to production
      // see https://electronjs.org/docs/tutorial/security.
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false
    }
  });

  // Attempt to load application from path provided by parent process
  let applicationPath = process.argv.pop();
  if (typeof applicationPath !== 'string' || applicationPath.indexOf('applicationPath') <= -1) {
    applicationPath = url.format({
      pathname: 'localhost:3000', // default port if non-provided by parent process
      protocol: 'http:',
      slashes: true,
    });
  } else {
    applicationPath = applicationPath.split('=')[1];
  }

  // and load the app.
  mainWindow.loadURL(applicationPath);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  app.whenReady().then(() => {
    protocol.registerFileProtocol('file', (request, callback) => {
      const pathname = request.url.replace('file:///', '');
      callback(pathname);
    });
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.webContents.on('context-menu', (_, props) => {
    const { x, y } = props;
    const contextMenu = [{
      label: 'Inspect',
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.inspectElement(x, y);
        }
      }
    }, {
      label: 'Reload',
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.reload();
        }
      }
    }];
    if (mainWindow) {
      Menu.buildFromTemplate(contextMenu).popup(mainWindow);
    }
  });
}

function startDevToolsInstall() {
  if (process.env.NODE_ENV === 'development') {
    const devToolsInstaller = require('electron-devtools-installer');
    const installer = devToolsInstaller.default;
    installer(devToolsInstaller.REDUX_DEVTOOLS)
      .then((name: string) => console.info(`extension installed: ${name}`))
      .catch((err: Error) => console.error(`error installing extension: ${err}`));;
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  startDevToolsInstall();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
