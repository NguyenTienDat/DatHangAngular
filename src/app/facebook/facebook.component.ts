import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeadersTable } from '../shared/custom-table/custom-table.component';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';
import { STATUS_LIST } from '../shared/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddModalComponent } from './add-modal/add-modal.component';
import { FirebaseServiceService } from '../shared/services/firebase-service.service';
import { ToastServiceService } from '../shared/services/toast-service.service';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss'],
})
export class FacebookComponent implements OnInit, OnDestroy {
  numberDefaultConfig: HeadersTable = {
    name: '',
    field: '',
    type: 'number',
    filter: { noFilter: true },
    styles: {
      width: '80px',
      'min-width': '5vw',
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
        'min-width': '100px',
        width: '100px',
      },
    },
    {
      name: 'Phân loại',
      field: 'prop',
      type: 'string',
      filter: { noFilter: true },
      styles: {
        'min-width': '100px',
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
        'min-width': '150px',
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
        'min-width': '100px',
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
        'min-width': '150px',
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
        'min-width': '160px',
      },
    },
    {
      ...this.numberDefaultConfig,
      name: 'Giá nhập',
      field: 'price',
      className: 'text-info',
    },
    {
      ...this.numberDefaultConfig,
      name: 'Giá bán',
      field: 'price2',
      className: 'text-primary',
    },
    {
      ...this.numberDefaultConfig,
      name: 'Tệ',
      field: 'CNY_price',
      className: 'text-danger',
    },
    {
      ...this.numberDefaultConfig,
      name: 'Cân',
      field: 'weight',
      className: 'text-danger',
    },
    {
      ...this.numberDefaultConfig,
      name: 'Giá cân',
      field: 'weight_price',
      className: 'text-danger',
    },
    {
      ...this.numberDefaultConfig,
      name: 'Tỉ giá',
      field: 'exchange',
      className: 'text-danger',
    },
  ];

  orders = [];

  ref!: DynamicDialogRef;

  constructor(
    private customHttpClientService: CustomHttpClientService,
    private toastServiceService: ToastServiceService,
    public dialogService: DialogService,
    private firebaseServiceService: FirebaseServiceService
  ) {}

  ngOnInit() {
    // this.customHttpClientService.getFacebookJSON().subscribe((res) => {
    //   this.orders = res;
    //   console.log(res);
    // });

    this.firebaseServiceService.fbQueryProducts().subscribe((res: any) => {
      console.log(res);
      res.sort((a: any, b: any) => (a.created < b.created ? 1 : -1));
      this.orders = res;
    });
  }

  valueChanged(event: any) {
    this.toastServiceService.add({
      severity: 'success',
      summary: `${event.item.customer} success`,
      detail: `${event.header.name} = ${event.value}`,
    });
  }
  show() {
    this.toastServiceService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  showAddModal() {
    this.ref = this.dialogService.open(AddModalComponent, {
      header: 'Đơn hàng mới',
      width: '700px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: this.headers,
    });

    this.ref.onClose.subscribe((product: any) => {
      this.toastServiceService.add({
        severity: 'info',
        summary: 'Product Selected',
        detail: 'close',
      });
    });

    this.ref.onMaximize.subscribe((value: any) => {
      this.toastServiceService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
