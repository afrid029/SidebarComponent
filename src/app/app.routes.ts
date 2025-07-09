import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : 'dashboard',
        loadComponent : () => import('../app/Components/dashboard/dashboard.component').then(m => m.DashboardComponent)

    }
];
