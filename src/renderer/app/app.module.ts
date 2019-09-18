import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './@business/entry/components/app/app.component';
import { GlobalModule } from './@global/global.module';
import { EntryModule } from './@business/entry/entry.module';
import { SharedModule } from './@shared/shared.module';
import { RouterModule } from '@angular/router';
import {DashboardModule} from "./@business/dashboard/dashboard.module";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([], { useHash: true }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [ HttpClient ]
            }
        }),

        // custom modules
        GlobalModule,
        SharedModule,
        EntryModule,
        DashboardModule,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule
{
    //
}
