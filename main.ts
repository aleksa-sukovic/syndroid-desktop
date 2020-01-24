import * as url from 'url';
import * as path from 'path';
import Application from './src/main/Application';
import { app, BrowserWindow, Menu, Tray } from 'electron';
import EventHandler from "./src/main/Library/Events/EventHandler";

let synDroid: Application = null;
let mainWindow: BrowserWindow = null;
let tray: Tray = null;
let serve: boolean = process.argv.slice(1)
    .some(val => val === '--serve');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

async function initializeMainWindow()
{
    mainWindow = new BrowserWindow({
        center: true,
        width: 300,
        height: 550,
        resizable: false,
        maximizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });

        await mainWindow.loadURL('http://localhost:4200');
        mainWindow.webContents.openDevTools();
    } else {
        await mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    mainWindow.on('closed', () => mainWindow = null);
    EventHandler.addWindow(mainWindow);
}

function initializeTray() {
    tray = serve ? new Tray('src/renderer/assets/tray.png') : new Tray(path.join(process.resourcesPath, 'src/renderer/assets/tray.png'));

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show', type: 'normal', click: () => {
            if (mainWindow === null) {
                initializeMainWindow();
            } else {
                mainWindow.show();
            }
        }},
        { label: '', type: 'separator' },
        { label: 'Exit', type: 'normal', click: () => terminate() }
    ]);
    tray.setToolTip('SynDroid');
    tray.setContextMenu(contextMenu);
}

function terminate() {
    EventHandler.removeWindow(mainWindow);

    if (synDroid !== null) {
        synDroid.stop();
    }

    if (app !== null) {
        app.quit();
    }

    synDroid = null;
    mainWindow = null;
}

try {
    app.on('ready', () => {
        initializeMainWindow().then(() => {
            synDroid = new Application();
            synDroid.serve();
        });
        initializeTray();
    });

    app.on('window-all-closed', () => {
        EventHandler.removeWindow(mainWindow);
        mainWindow = null;
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            initializeMainWindow().then(() => console.log('Application booted.'));
        }
    });
} catch (e) {
    //
}
