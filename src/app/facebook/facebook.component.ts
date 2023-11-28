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
    },
    {
      name: 'Phân loại',
      field: 'prop',
      type: 'string',
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
    },
    {
      name: 'Giá bán',
      field: 'price2',
      type: 'number',
    },
    {
      name: 'Tệ',
      field: 'CNY_price',
      type: 'number',
    },
    {
      name: 'Cân',
      field: 'weight',
      type: 'number',
    },
    {
      name: 'Giá cân',
      field: 'weight_price',
      type: 'number',
    },
    {
      name: 'Tỉ giá',
      field: 'exchange',
      type: 'number',
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
