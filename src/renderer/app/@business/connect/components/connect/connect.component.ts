import * as QR from 'qrcode-generator';
import { Component, NgZone, OnInit } from '@angular/core';
import { ElectronService } from '../../../../@global/services/electron.service';
import { Router } from "@angular/router";

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
        setTimeout(() => {
            this.electron.ipcRenderer.send('ip:get');
            this.electron.ipcRenderer.on('ip:get', this.handleIPAddressFetchEvent.bind(this));
            this.electron.ipcRenderer.on('client:connect', this.handleClientConnected.bind(this));
        }, 100);
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
}
