import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NbLayoutModule } from '@nebular/theme';
import { ToastService } from '../shared/services/toast.service';
const routers: Routes = [
  {
    path: 'facebook',
    loadChildren: () =>
      import('./facebook/facebook.module').then((m) => m.FacebookModule),
  },
  {
    path: 'tmdt',
    loadChildren: () => import('./tmdt/tmdt.module').then((m) => m.TmdtModule),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./setting/setting.module').then((m) => m.SettingModule),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: '',
    redirectTo: 'facebook',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routers)],
  providers: [ToastService],
})
export class PagesModule {}
