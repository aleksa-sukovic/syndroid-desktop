import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './components/connect/connect.component';

const routes: Routes = [
    {
        path: 'connect',
        component: ConnectComponent,
    }
];

export const ConnectRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
