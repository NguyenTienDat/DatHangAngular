export const STATUS_LIST = [
  {
    name: 'ĐÃ ĐẶT',
    value: STATUS_DROPDOWN.ORDERED,
  },
  {
    name: 'ĐÃ NHẬN',
    value: STATUS_DROPDOWN.RECEIVED,
  },
  {
    name: 'ĐÃ TRẢ',
    value: STATUS_DROPDOWN.DELIVERY,
  },
  {
    name: 'DONE',
    value: STATUS_DROPDOWN.DONE,
  },
  {
    name: 'DELETED',
    value: STATUS_DROPDOWN.DELETED,
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
  'CLONE_A_COPY',
}

export interface EnvironmentDB {
  name: string;
  products: string;
  tmdt: string;
  index: number;
  customers: string;
}

export const ENVIRONMENT_LIST: EnvironmentDB[] = [
  {
    name: 'Production',
    products: 'products',
    tmdt: 'tmdt',
    index: 0,
    customers: 'customers',
  },
  {
    name: 'Develop',
    products: 'products_dev',
    tmdt: 'tmdt_dev',
    index: 1,
    customers: 'customers_dev',
  },
];

export interface ICustomer {
  name?: string;
  phone?: string;
  description?: string;
  link?: string;
  address?: string;
  _id?: string;
  status?: STATUS_CUSTOMER_ENUM;
  updated?: number;
  created?: number;
}

export const enum STATUS_CUSTOMER_ENUM {
  ACTIVE = 0,
  DELETED = 1,
}
export const STATUS_CUSTOMER_LIST = [
  {
    name: 'ACTIVE',
    value: STATUS_CUSTOMER_ENUM.ACTIVE,
  },
  {
    name: 'DELETED',
    value: STATUS_DROPDOWN.DELETED,
  },
];
