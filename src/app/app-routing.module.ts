import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component:AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () =>  import('./pages/profile/profile.module').then(module => module.ProfileModule)
      },
      {
        path:  'media',
        loadChildren: () => import('./pages/media/media.module').then(module => module.MediaModule)
      },
      {
        path: 'subscription',
        loadChildren: () => import('./pages/subscription/subscription.module').then(module => module.SubscriptionModule)
      },
      {
        path: 'banners',
        loadChildren: () => import('./pages/banners/banners.module').then(module => module.BannersModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.module').then(module => module.CustomersModule)
      }
    ]
  },
  {
    path:'',
    component:AuthComponent,
    children:[
      {
       path:'auth',
       loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
