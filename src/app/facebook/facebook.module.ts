import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookComponent } from './facebook.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddModalComponent } from './add-modal/add-modal.component';
import { DialogService, DynamicDialogInjector } from 'primeng/dynamicdialog';

const routes: Routes = [
  {
    path: '',
    component: FacebookComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [FacebookComponent, AddModalComponent],
  providers: [DialogService],
  exports: [],
})
export class FacebookModule {}
