import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
