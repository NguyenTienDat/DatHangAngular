import { FirebaseService } from './../services/firebase.service';
import { Component } from '@angular/core';

interface LeftMenu {
  name: string;
  path?: string;
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
      icon: 'pi pi-facebook',
    },
    {
      name: 'TMĐT',
      path: 'tmdt',
      tooltip: 'Quản lý các đơn hàng bán các sàn như Shopee, Lazada',
      icon: 'pi pi-shopping-cart',
    },
    {
      name: 'Customer',
      path: 'customer',
      tooltip: 'Quản lý khách hàng',
      icon: 'pi pi-user-edit',
    },
    {
      name: 'Setting',
      path: 'setting',
      tooltip: 'Tùy biến cấu hình',
      icon: 'pi pi-cog',
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
