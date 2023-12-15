import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdtComponent } from './tmdt.component';
const routers: Routes = [
  {
    path: '',
    component: TmdtComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
  ],
  declarations: [TmdtComponent]
})
export class TmdtModule { }
