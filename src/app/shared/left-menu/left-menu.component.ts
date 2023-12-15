import { Component, Output, EventEmitter } from '@angular/core';

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
  @Output() open = new EventEmitter<boolean>();
  @Output() show = new EventEmitter<boolean>();
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
    {
      name: 'SETTING',
      path: 'setting',
      tooltip: 'Tùy biến cấu hình',
      icon: 'settings-2-outline',
    },
    // {
    //   name: 'Search',
    //   tooltip: 'Search',
    //   path: '#',
    //   icon: 'bx bx-search',
    // },
  ];

  isShowMenu = false;
  isOpen = false;

  close() {
    this.isOpen = false;
    this.open.emit(this.isOpen);
  }

  btnClick() {
    this.isOpen = !this.isOpen;
    this.open.emit(this.isOpen);
  }

  showMenu(isShowMenu: boolean) {
    this.isShowMenu = isShowMenu;
    this.show.emit(isShowMenu);
  }
}
