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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageSelectComponent } from './image-select/image-select.component';
import { ContextMenuModule } from 'primeng/contextmenu';

const components = [
  LeftMenuComponent,
  FooterComponent,
  CustomTableComponent,
  ImageSelectComponent,
];
const primengModules = [
  TableModule,
  DropdownModule,
  MultiSelectModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  FileUploadModule,
  ToastModule,
  DynamicDialogModule,
  ContextMenuModule,
];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbIconModule,
    ...primengModules,
  ],
  providers: [MessageService, DialogService],
  exports: [...components, ...primengModules],
})
export class SharedModule {}
