import { Component, NgZone, OnInit } from '@angular/core';
import { ElectronService } from '../../../../@global/services/electron.service';
import { Router } from "@angular/router";

@Component({
    selector: 'dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit
{
    public constructor (private electron: ElectronService, private ngZone: NgZone, private router: Router)
    {
        //
    }

    public ngOnInit(): void
    {
        this.electron.ipcRenderer.on('client:disconnect', this.handleClientDisconnect.bind(this))
    }

    protected handleClientDisconnect(): void
    {
        this.ngZone.run(() => this.router.navigate(['connect']));
    }
}
