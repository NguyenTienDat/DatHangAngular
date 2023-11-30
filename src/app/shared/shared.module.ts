import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbIconModule } from '@nebular/theme';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';

const components = [LeftMenuComponent, FooterComponent, CustomTableComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbIconModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    FileUploadModule,
  ],
  providers: [],
  exports: [...components],
})
export class SharedModule {}
