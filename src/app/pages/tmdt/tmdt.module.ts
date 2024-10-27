import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdtComponent } from './tmdt.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TmdtTableComponent } from './tmdt-table/tmdt-table.component';
import { AddModalComponent } from './add-modal/add-modal.component';
const routers: Routes = [
  {
    path: '',
    component: TmdtComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
    SharedModule,
    FormsModule,
  ],
  declarations: [TmdtComponent, TmdtTableComponent, AddModalComponent],
})
export class TmdtModule {}
