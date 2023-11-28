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
    },
    {
      name: 'Phân loại',
    },
    {
      name: 'Khách hàng',
    },
    {
      name: 'Ghi chú',
    },
    {
      name: 'Trạng thái',
    },
    {
      name: 'Mã vận đơn',
    },
    {
      name: 'Giá nhập',
    },
    {
      name: 'Giá bán',
    },
    {
      name: 'Tệ',
    },
    {
      name: 'Cân',
    },
    {
      name: 'Giá cân',
    },
    {
      name: 'Tỉ giá',
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
