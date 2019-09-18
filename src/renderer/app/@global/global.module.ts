import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ElectronService} from "./services/electron.service";

@NgModule({
    providers: [
        RouterModule,
        ElectronService,
    ]
})
export class GlobalModule
{
    //
}
