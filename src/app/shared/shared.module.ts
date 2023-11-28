import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbIconModule } from '@nebular/theme';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { TableModule } from 'primeng/table';

const components = [LeftMenuComponent, FooterComponent, CustomTableComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, RouterModule, NbIconModule, TableModule],
  providers: [],
  exports: [...components],
})
export class SharedModule {}
