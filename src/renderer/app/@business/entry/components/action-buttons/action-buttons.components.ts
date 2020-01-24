import { Component } from "@angular/core";
import { ElectronService } from "../../../../@global/services/electron.service";

@Component({
    selector: 'action-buttons',
    template: `
        <div class="btn-container">
            <div class="btn btn-close" (click)="handleCloseClick()"><i class="fas fa-window-close"></i></div>
            <div class="btn btn-minimize" (click)="handleMinimiseClick()"><i class="fas fa-window-minimize"></i></div>
        </div>
    `,
    styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent
{
    public constructor (private electronService: ElectronService)
    {
        //
    }

    public handleCloseClick()
    {
        this.electronService.ipcRenderer.send('action:close');
    }

    public handleMinimiseClick()
    {
        this.electronService.ipcRenderer.send('action:minimise');
    }
}
