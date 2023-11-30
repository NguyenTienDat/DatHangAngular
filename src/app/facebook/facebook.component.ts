import { Component, OnInit } from '@angular/core';
import { HeadersTable } from '../shared/custom-table/custom-table.component';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';
import { STATUS_LIST } from '../shared/models';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss'],
})
export class FacebookComponent implements OnInit {
  numberDefaultConfig: HeadersTable = {
    name: '',
    field: '',
    type: 'number',
    filter: { noFilter: true },
    styles: {
      width: '80px',
      'text-align': 'right',
    },
  };

  headers: HeadersTable[] = [
    {
      name: 'Image',
      field: 'imageLink',
      type: 'image',
      className: 'image-col',
      filter: { noFilter: true },
      styles: {
        width: '100px',
      },
    },
    {
      name: 'Phân loại',
      field: 'prop',
      type: 'string',
      filter: { noFilter: true },
      styles: {
        width: '100px',
      },
    },
    {
      name: 'Khách hàng',
      field: 'customer',
      type: 'link',
      className: 'custom-link',
      filter: {},
      styles: {
        width: '150px',
      },
    },
    {
      name: 'Ghi chú',
      field: 'description',
      type: 'string',
      filter: {},
      styles: {
        wordBreak: 'break-all',
        width: '100%',
      },
    },
    {
      name: 'Trạng thái',
      field: 'status',
      type: 'dropdown',
      filter: {
        dropdownOptions: STATUS_LIST,
        filterValue: [],
        matchMode: 'in',
      },
      styles: {
        width: '150px',
        'text-align': 'center',
      },
    },
    {
      name: 'Mã vận đơn',
      field: 'orderID',
      type: 'string',
      filter: {},
      styles: {
        width: '160px',
      },
    },
    {
      ...this.numberDefaultConfig,
      name: 'Giá nhập',
      field: 'price',
      className: 'text-warning',
    },
    {
      ...this.numberDefaultConfig,
      name: 'Giá bán',
      field: 'price2',
    },
    {
      ...this.numberDefaultConfig,
      name: 'Tệ',
      field: 'CNY_price',
    },
    { ...this.numberDefaultConfig, name: 'Cân', field: 'weight' },
    {
      ...this.numberDefaultConfig,
      name: 'Giá cân',
      field: 'weight_price',
    },
    {
      ...this.numberDefaultConfig,
      name: 'Tỉ giá',
      field: 'exchange',
    },
  ];

  orders = [];

  constructor(private customHttpClientService: CustomHttpClientService) {}

  ngOnInit() {
    this.customHttpClientService.getFacebookJSON().subscribe((res) => {
      this.orders = res;
      console.log(res);
    });
  }
}
