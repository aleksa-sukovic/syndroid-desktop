import { BrowserWindow, ipcMain } from 'electron';
import Application from "../../Application";

export default class EventHandler
{
    protected static windows: BrowserWindow[] = [];

    public listen(application: Application): void
    {
        ipcMain.on('request:send', (event, request, callback) => {
            application.sendRequest(request, callback);
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

