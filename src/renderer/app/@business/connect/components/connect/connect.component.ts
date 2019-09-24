import * as QR from 'qrcode-generator';
import { Component, NgZone, OnInit } from '@angular/core';
import { ElectronService } from '../../../../@global/services/electron.service';

@Component({
    selector: 'connect',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit
{
    protected ip: string = '';

    public constructor (private electron: ElectronService, private ngZone: NgZone)
    {
        //
    }

    public ngOnInit(): void
    {
        setTimeout(() => {
            this.electron.ipcRenderer.send('ip:get');
            this.electron.ipcRenderer.on('ip:get', this.handleIPAddressFetchEvent.bind(this));
        }, 50);
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
}
