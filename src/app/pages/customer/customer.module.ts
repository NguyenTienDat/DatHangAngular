import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AddModalComponent } from './add-modal/add-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiHandlerModalComponent } from './multi-handler-modal/multi-handler-modal.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    CustomerComponent,
    AddModalComponent,
    MultiHandlerModalComponent,
    CustomerTableComponent,
  ],
  providers: [DialogService],
  exports: [],
})
export class CustomerModule {}
