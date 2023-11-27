import { Component } from '@angular/core';

interface LeftMenu {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent {
  leftMenu: LeftMenu[] = [
    {
      name: 'Facebook',
      path: 'facebook',
      icon: 'fa facebook',
    },
    {
      name: 'TMĐT',
      path: 'tmdt',
      icon: 'fa facebook',
    },
  ];

  isOpen = true;

  close() {
    this.isOpen = false;
  }

  btnClick() {
    this.isOpen = !this.isOpen;
  }
}
