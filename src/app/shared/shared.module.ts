import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomTableComponent } from '../pages/facebook/facebook-table/facebook-table.component';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToggleButtonModule } from 'primeng/togglebutton';

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
  ConfirmDialogModule,
  ButtonModule,
  CheckboxModule,
  TooltipModule,
  AccordionModule,
  SpeedDialModule,
  ToggleButtonModule,
];
@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, RouterModule, ...primengModules],
  providers: [MessageService, DialogService],
  exports: [...components, ...primengModules],
})
export class SharedModule {}
