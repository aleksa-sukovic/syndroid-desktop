import { NgModule } from '@angular/core';
import { GlobalModule } from '../../@global/global.module';
import { SharedModule } from '../../@shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';

@NgModule({
    declarations: [
        DashboardContainerComponent,
    ],
    imports: [
        GlobalModule,
        DashboardRoutingModule,
        SharedModule,
    ],
    providers: [
        //
    ]
})
export class DashboardModule
{

}
