import { NgModule } from '@angular/core';
import { LoaderComponent } from "./components/loader/loader.component";

@NgModule({
    declarations: [
        LoaderComponent,
    ],
    exports: [
        LoaderComponent,
    ]
})
export class SharedModule
{

}
