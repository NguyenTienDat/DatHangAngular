import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'facebook',
    loadChildren: () =>
      import('./pages/facebook/facebook.module').then((m) => m.FacebookModule),
  },
  {
    path: 'tmdt',
    loadChildren: () =>
      import('./pages/tmdt/tmdt.module').then((m) => m.TmdtModule),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./pages/setting/setting.module').then((m) => m.SettingModule),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./pages/customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: '',
    redirectTo: 'facebook',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'facebook',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
