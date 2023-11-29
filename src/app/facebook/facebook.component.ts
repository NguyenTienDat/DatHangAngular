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
  headers: HeadersTable[] = [
    {
      name: 'Image',
      field: 'imageLink',
      type: 'image',
      className: 'image-col',
      filter: { noFilter: true },
    },
    {
      name: 'Phân loại',
      field: 'prop',
      type: 'string',
      filter: { noFilter: true },
    },
    {
      name: 'Khách hàng',
      field: 'customer',
      type: 'link',
      className: 'custom-link',
      filter: {},
    },
    {
      name: 'Ghi chú',
      field: 'description',
      type: 'string',
      className: 'description-col',
      filter: {},
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
    },
    {
      name: 'Mã vận đơn',
      field: 'orderID',
      type: 'string',
      filter: {},
    },
    {
      name: 'Giá nhập',
      field: 'price',
      type: 'number',
      filter: { noFilter: true },
    },
    {
      name: 'Giá bán',
      field: 'price2',
      type: 'number',
      filter: { noFilter: true },
    },
    {
      name: 'Tệ',
      field: 'CNY_price',
      type: 'number',
      filter: { noFilter: true },
    },
    {
      name: 'Cân',
      field: 'weight',
      type: 'number',
      filter: { noFilter: true },
    },
    {
      name: 'Giá cân',
      field: 'weight_price',
      type: 'number',
      filter: { noFilter: true },
    },
    {
      name: 'Tỉ giá',
      field: 'exchange',
      type: 'number',
      filter: { noFilter: true },
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
