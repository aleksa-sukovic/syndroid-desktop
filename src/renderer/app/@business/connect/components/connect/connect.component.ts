import * as QR from 'qrcode-generator';
import { Router } from "@angular/router";
import { Component, NgZone, OnInit } from '@angular/core';
import { ElectronService } from '../../../../@global/services/electron.service';

@Component({
    selector: 'connect',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit
{
    public ip: string = '';

    public constructor (private electron: ElectronService, private ngZone: NgZone, private router: Router)
    {
        //
    }

    public ngOnInit(): void
    {
        this.electron.ipcRenderer.send('ip:get');
        this.electron.ipcRenderer.send('user:is-connected');
        this.electron.ipcRenderer.on('ip:get', this.handleIPAddressFetchEvent.bind(this));
        this.electron.ipcRenderer.on('client:connect', this.handleClientConnected.bind(this));
        this.electron.ipcRenderer.on('user:is-connected', this.handleUserConnectedStatus.bind(this));
    }

    protected handleIPAddressFetchEvent(event: Event, data: any)
    {
        this.ngZone.run(() => {
            this.ip = data;
            this.generateQRCode(data);
        });
    }

    protected generateQRCode(ip: string): void
    {
        let qr = QR(4, 'L');
        qr.addData(ip);
        qr.make();
        document.getElementById('qr_container').innerHTML = qr.createImgTag(5);
    }

    protected handleClientConnected(): void
    {
        this.ngZone.run(() => this.router.navigate(['dashboard']));
    }

    protected handleUserConnectedStatus(event: Event, connected: any): void
    {
        if (connected) {
            this.ngZone.run(() => this.router.navigate(['dashboard']));
        }
    }
}
