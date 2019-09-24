import { Component, NgZone, OnInit } from '@angular/core';
import { ElectronService } from '../../../../@global/services/electron.service';
import { Router } from "@angular/router";
import Request, { RequestBuilder } from "../../../../../../main/Library/Router/Request";

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
        this.electron.ipcRenderer.on('client:disconnect', this.handleClientDisconnect.bind(this));

        let request: Request = new RequestBuilder()
            .setRouteByPath('/battery/percentage')
            .expectResponse()
            .autoincrement()
            .setType('request')
            .build();

        this.electron.ipcRenderer.send('request:send', request.toString());
    }

    protected handleClientDisconnect(): void
    {
        this.ngZone.run(() => this.router.navigate(['connect']));
    }
}
