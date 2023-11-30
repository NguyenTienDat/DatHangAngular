import { Component } from '@angular/core';

interface LeftMenu {
  name: string;
  path: string;
  icon: string;
  tooltip: string;
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
      tooltip: 'Quản lý các đơn hàng bán trên Facebook',
      path: 'facebook',
      icon: 'facebook-outline',
    },
    {
      name: 'TMĐT',
      path: 'tmdt',
      tooltip: 'Quản lý các đơn hàng bán các sàn như Shopee, Lazada',
      icon: 'shopping-cart-outline',
    },
    // {
    //   name: 'Search',
    //   tooltip: 'Search',
    //   path: '#',
    //   icon: 'bx bx-search',
    // },
  ];

  isOpen = true;

  close() {
    this.isOpen = false;
  }

  btnClick() {
    this.isOpen = !this.isOpen;
  }
}
