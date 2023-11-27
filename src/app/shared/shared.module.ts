import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

const components = [LeftMenuComponent, FooterComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, BrowserModule, FormsModule],
  providers: [],
  exports: [...components],
})
export class SharedModule {}
