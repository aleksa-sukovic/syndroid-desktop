import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardContainerComponent,
    }
];

export const DashboardRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
