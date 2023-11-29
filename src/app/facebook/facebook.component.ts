import { Component, OnInit } from '@angular/core';
import { HeadersTable } from '../shared/custom-table/custom-table.component';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';

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
      noFilter: true,
    },
    {
      name: 'Phân loại',
      field: 'prop',
      type: 'string',
      noFilter: true,
    },
    {
      name: 'Khách hàng',
      field: 'customer',
      type: 'link',
      className: 'custom-link',
    },
    {
      name: 'Ghi chú',
      field: 'description',
      type: 'string',
      className: 'description-col',
    },
    {
      name: 'Trạng thái',
      field: 'status',
      type: 'string',
    },
    {
      name: 'Mã vận đơn',
      field: 'orderID',
      type: 'string',
    },
    {
      name: 'Giá nhập',
      field: 'price',
      type: 'number',
      noFilter: true,
    },
    {
      name: 'Giá bán',
      field: 'price2',
      type: 'number',
      noFilter: true,
    },
    {
      name: 'Tệ',
      field: 'CNY_price',
      type: 'number',
      noFilter: true,
    },
    {
      name: 'Cân',
      field: 'weight',
      type: 'number',
      noFilter: true,
    },
    {
      name: 'Giá cân',
      field: 'weight_price',
      type: 'number',
      noFilter: true,
    },
    {
      name: 'Tỉ giá',
      field: 'exchange',
      type: 'number',
      noFilter: true,
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
