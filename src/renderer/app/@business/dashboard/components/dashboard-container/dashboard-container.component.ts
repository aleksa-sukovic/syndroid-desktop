import { Component, NgZone } from '@angular/core';
import { ElectronService } from '../../../../@global/services/electron.service';

@Component({
    selector: 'dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent
{
    public constructor (private electron: ElectronService, private ngZone: NgZone)
    {
        //
    }
}
