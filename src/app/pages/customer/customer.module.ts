import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomTableComponent } from './customer-table/customer-table.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
  },
];

@NgModule({
  declarations: [CustomerComponent, CustomTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DialogService],
})
export class CustomerModule {}
