export const STATUS_LIST = [
  {
    name: 'ĐÃ ĐẶT',
    value: STATUS_DROPDOWN.ORDERED,
    checked: true,
    class: 'tr-0',
  },
  {
    name: 'ĐÃ NHẬN',
    value: STATUS_DROPDOWN.RECEIVED,
    checked: true,
    class: 'tr-1',
  },
  {
    name: 'ĐÃ TRẢ',
    value: STATUS_DROPDOWN.DELIVERY,
    checked: true,
    class: 'tr-2',
  },
  {
    name: 'DONE',
    value: STATUS_DROPDOWN.DONE,
    checked: false,
    class: 'tr-done',
  },
  {
    name: 'DELETED',
    value: STATUS_DROPDOWN.DELETED,
    checked: false,
    class: 'tr-done',
  },
];

export const enum STATUS_DROPDOWN {
  ORDERED = 0,
  RECEIVED = 1,
  DELIVERY = 2,
  DONE = 3,
  DELETED = 4,
}
export interface FacebookProduct {
  CNY_price?: number;
  created?: number;
  customer?: string;
  description?: string;
  imageLink?: string;
  orderID?: string;
  price?: number;
  price2?: number;
  prop?: string;
  status?: STATUS_DROPDOWN;
  updated?: number;
  weight?: number;
  exchange?: number;
  weight_price?: number;
  _id?: string;
}

export enum CONTEXT_MENU_EVENT {
  'DELETE_ACCEPT',
  'DELETE_REJECT_CANCEL',
}

export interface EnvironmentDB {
  name: string;
  products: string;
  tmdt: string;
  index: number;
}

export const ENVIRONMENT_LIST: EnvironmentDB[] = [
  {
    name: 'Production',
    products: 'products',
    tmdt: 'tmdt',
    index: 0,
  },
  {
    name: 'Develop',
    products: 'products_dev',
    tmdt: 'tmdt_dev',
    index: 1,
  },
];
