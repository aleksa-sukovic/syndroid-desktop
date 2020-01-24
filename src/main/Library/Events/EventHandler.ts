import { BrowserWindow, ipcMain } from 'electron';
import Application from "../../Application";
import { app } from 'electron';

export default class EventHandler
{
    protected static windows: BrowserWindow[] = [];

    public listen(application: Application): void
    {
        ipcMain.on('request:send', (event, message) => {
            application.sendRequest(message);
        });

        ipcMain.on('ip:get', event => {
            event.sender.send('ip:get', application.getIP());
        });

        ipcMain.on('user:is-connected', event => {
            event.sender.send('user:is-connected', application.userConnected());
        });

        ipcMain.on('action:close', event => {
            application.stop();
            EventHandler.windows.forEach(w => w.destroy());
            app.quit();
        });

        ipcMain.on('action:minimise', event => {
            EventHandler.windows.forEach(w => w.minimize());
        });
    }

    public static addWindow(window: BrowserWindow): void
    {
        EventHandler.windows.push(window);
    }

    public static removeWindow(window: BrowserWindow): void
    {
        for (let i = 0; i < EventHandler.windows.length; i++) {
            if (EventHandler.windows[i].id === window.id) {
                EventHandler.windows.splice(i, 1);

                return;
            }
        }
    }

    public static notifyWindows(key: string, data: any): void
    {
        for (let window of EventHandler.windows) {
            window.webContents.send(key, data);
        }
    }
}

