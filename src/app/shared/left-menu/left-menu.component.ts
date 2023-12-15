import { FirebaseService } from './../services/firebase.service';
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
    {
      name: 'Setting',
      path: 'setting',
      tooltip: 'Tùy biến cấu hình',
      icon: 'settings-2-outline',
    },
  ];

  constructor(public firebaseService: FirebaseService) {}

  close() {
    this.firebaseService.IS_OPEN_MENU$.next(false);
  }

  btnClick() {
    this.firebaseService.IS_OPEN_MENU$.next(
      !this.firebaseService.IS_OPEN_MENU$.value
    );
  }

  showMenu(isShowMenu: boolean) {
    this.firebaseService.IS_SHOW_MENU$.next(isShowMenu);
  }
}
