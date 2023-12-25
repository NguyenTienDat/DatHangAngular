export const STATUS_LIST = [
  {
    name: 'CHƯA ĐẶT',
    value: STATUS_DROPDOWN.NOT_ORDER_YET,
  },
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
  NOT_ORDER_YET = 5,
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

export interface ITmdtDetail {
  description?: string;
  orderID?: string;
  price?: number;
  quantity?: number;
  seller?: string;
}
export interface ITmdt {
  imageLink?: string;
  price?: number;
  prop_color?: string;
  prop_size?: string;
  quantity?: number;
  sku?: string;
  _id?: string;
  updated?: number;
  created?: number;
  details?: ITmdtDetail[];
  updatedDetails?: number;
  // UI fields
  _rowspan?: number;
}

export const LIST_KENH = [
  { name: 'SHOPEE', image: 'https://img.icons8.com/fluency/50/shopee.png' },
  {
    name: 'LAZADA',
    image:
      'https://i.pinimg.com/564x/32/94/98/329498a465defb414b7860fc4e86310c.jpg',
  },
  {
    name: 'FACEBOOK',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg',
  },
];

export function PROPS(): any[] {
  return [
    {
      id: 'prop_color',
      name: 'MÀU',
      list: ['NONE', 'ĐEN', 'NÂU', 'BE', 'TRẮNG'],
      order: 1,
    },
    {
      id: 'prop_size',
      name: 'SIZE',
      list: [
        'NONE',
        66,
        73,
        80,
        90,
        100,
        110,
        120,
        130,
        140,
        150,
        1,
        3,
        5,
        7,
        9,
        11,
        13,
        15,
        17,
        19,
      ],
      order: 2,
    },
  ].sort(function (a, b) {
    return (a.order || 0) < (b.order || 0) ? -1 : 1;
  });
}
