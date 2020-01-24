import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { RouterModule } from '@angular/router';
import { GlobalModule } from '../../@global/global.module';
import { ActionButtonsComponent } from "./components/action-buttons/action-buttons.components";

@NgModule({
    imports: [
        RouterModule,
        GlobalModule,
    ],
    declarations: [
        AppComponent,
        ActionButtonsComponent,
    ],
    exports: [
        AppComponent
    ]
})
export class EntryModule
{
    //
}
