import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'facebook',
    loadChildren: () =>
      import('./facebook/facebook.module').then((m) => m.FacebookModule),
  },
  {
    path: 'tmdt',
    loadChildren: () =>
      import('./tmdt/tmdt.module').then((m) => m.TmdtModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
