import { NgModule } from '@angular/core';
import { GlobalModule } from '../../@global/global.module';
import { SharedModule } from '../../@shared/shared.module';
import { ConnectComponent } from './components/connect/connect.component';
import { ConnectRoutingModule } from './connect.routing';

@NgModule({
    declarations: [
        ConnectComponent,
    ],
    imports: [
        GlobalModule,
        SharedModule,
        ConnectRoutingModule,
    ],
    providers: [
        //
    ]
})
export class ConnectModule
{

}
