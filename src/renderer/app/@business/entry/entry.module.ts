import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { RouterModule } from '@angular/router';
import { GlobalModule } from '../../@global/global.module';

@NgModule({
    imports: [
        RouterModule,
        GlobalModule,
    ],
    declarations: [
        AppComponent
    ],
    exports: [
        AppComponent
    ]
})
export class EntryModule
{
    //
}
