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
];

export const enum STATUS_DROPDOWN {
  ORDERED = 0,
  RECEIVED = 1,
  DELIVERY = 2,
  DONE = 3,
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
