import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from '../../../../@global/services/electron.service';
import { Router } from "@angular/router";
import Request, { RequestBuilder } from "../../../../../../main/Library/Router/Request";
import Route from "../../../../../../main/Library/Router/Route/Route";

@Component({
    selector: 'dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit, OnDestroy
{
    public phone: any = {};
    private batteryRequest: Request;
    private infoRequest: Request;

    public constructor (private electron: ElectronService, private ngZone: NgZone, private router: Router)
    {
        //
    }

    public ngOnInit(): void
    {
        this.electron.ipcRenderer.on('client:disconnect', this.handleClientDisconnect.bind(this));
        this.electron.ipcRenderer.on('request:receive', this.handleClientResponse.bind(this));
        this.requestBatteryInfo();
        this.requestPhoneInfo();
    }

    private requestBatteryInfo(): void
    {
        this.batteryRequest = new RequestBuilder()
            .setRouteByPath('/battery/percentage')
            .expectResponse()
            .autoincrement()
            .setType('request')
            .build();

        this.electron.ipcRenderer.send('request:send', this.batteryRequest.toString());
    }

    private requestPhoneInfo(): void
    {
        this.infoRequest = new RequestBuilder()
            .setRouteByPath("/device/info")
            .expectResponse()
            .autoincrement()
            .setType('request')
            .build();

        this.electron.ipcRenderer.send('request:send', this.infoRequest.toString());
    }

    public ngOnDestroy(): void
    {
        this.electron.ipcRenderer.removeListener('request:receive', this.handleClientResponse);
        this.electron.ipcRenderer.removeListener('client:disconnect', this.handleClientDisconnect);
    }

    protected handleClientResponse(event, data: string): void
    {
        let request = new Request(new Route(data));

        this.ngZone.run(() => {
            if (request.getID() == this.batteryRequest.getID()) {
                this.phone.battery = request.getParams().percentage;
            } else if (request.getID() == this.infoRequest.getID()) {
                this.phone.name = request.getParams().name;
                this.phone.manufacturer = request.getParams().manufacturer;
                this.phone.model = request.getParams().model;
                this.phone.deviceName = request.getParams().deviceName;
                this.phone.codename = request.getParams().codename;
            }
        })
    }

    protected handleClientDisconnect(): void
    {
        this.ngZone.run(() => this.router.navigate(['connect']));
    }
}
