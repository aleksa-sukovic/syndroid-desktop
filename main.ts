import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import Application from './src/main/Application';

let mainWindow, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

async function createWindow() {

    mainWindow = new BrowserWindow({
        x: 0,
        y: 0,
        width: 450,
        height: 450,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
        icon: path.join(__dirname, 'build/icon.icns')
    });

    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });

        await mainWindow.loadURL('http://localhost:4200');
    } else {
        await mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    if (serve) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => mainWindow = null);
}

try {

    app.on('ready', () => {
        Application.init().then(() => createWindow());
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow().then(() => console.log('Application booted.'));
        }
    });

} catch (e) {
    //
}
