import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        pathMatch : 'full',
        redirectTo : '/favourite'
    },
    {
        path : 'favourite',
        children :[
            {
                path : '',
                pathMatch : 'full',
                redirectTo : 'dashboard',
            },
            {
                path : 'dashboard',
                loadComponent : () => import('../app/Components/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path : 'project',
                loadComponent : () => import('../app/Components/project/project.component').then(m => m.ProjectComponent),
                children : [
                    {
                        path: 'source',
                        loadComponent : () => import ('../app/Components/source/source.component').then(m => m.SourceComponent)
                    }, 
                    {
                        path : 'bussiness',
                        loadComponent : () => import('../app/Components/bussiness/bussiness.component').then(m => m.BussinessComponent),
                        children : [
                            {
                                path : 'amazon', 
                                loadComponent : () => import('../app/Components/amazon/amazon.component').then(m => m.AmazonComponent)
                            },
                            {
                                path : 'google',
                                loadComponent : () => import('../app/Components/google/google.component').then(m => m.GoogleComponent)
                            }
                        ]
                    }
                ]
            }
           
        ]
    },
   
];
