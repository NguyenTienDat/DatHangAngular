import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeadersTable } from '../shared/custom-table/custom-table.component';
import { CustomHttpClientService } from '../shared/services/custom-http-client.service';
import {
  CONTEXT_MENU_EVENT,
  FacebookProduct,
  STATUS_LIST,
} from '../shared/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddModalComponent } from './add-modal/add-modal.component';
import { FirebaseServiceService } from '../shared/services/firebase-service.service';
import { ToastServiceService } from '../shared/services/toast-service.service';
import { MultiHandlerModalComponent } from './multi-handler-modal/multi-handler-modal.component';
import { ConfirmationService, MenuItem } from 'primeng/api';

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
  ];

  actionMenuItems!: MenuItem[];

  orders = [];

  ref!: DynamicDialogRef;
  selectedItems: FacebookProduct[] = [];
  isEditMode = false;

  constructor(
    private customHttpClientService: CustomHttpClientService,
    private toastServiceService: ToastServiceService,
    public dialogService: DialogService,
    private firebaseServiceService: FirebaseServiceService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getActionsMenu();
    this.getData();
  }

  private getActionsMenu() {
    this.actionMenuItems = [
      {
        icon: this.isEditMode ? 'pi pi-eye' : 'pi pi-pencil',
        command: () => {
          if (this.isEditMode) {
            this.isEditMode = false;
            this.getActionsMenu();
          } else {
            this.confirmationService.confirm({
              message: `Các thay đổi sẽ được áp dụng ngay lập tức, dev không thể khôi phục khi bạn lỡ tay sửa nhầm ;) `,
              header: 'EDIT MODE',
              icon: 'pi pi-info-circle',
              acceptButtonStyleClass: 'bg-danger',
              rejectButtonStyleClass: 'bg-success',
              accept: () => {
                this.isEditMode = true;
                this.getActionsMenu();
              },
              reject: () => {
                this.isEditMode = false;
                this.getActionsMenu();
              },
            });
          }
        },
      },
      {
        icon: 'pi pi-trash',
        command: () => {
          if (this.selectedItems.length) {
            this.confirmationService.confirm({
              message: `Xóa ${this.selectedItems.length} đơn hàng đang chọn?`,
              header: 'Delete Confirmation',
              icon: 'pi pi-info-circle',
              acceptButtonStyleClass: 'bg-danger',
              rejectButtonStyleClass: 'bg-success',
              defaultFocus: 'reject',
              accept: () => {
                alert('TOBE dev');
              },
              reject: () => {},
            });
          } else {
            this.toastServiceService.showToastWarning(
              'Hãy chọn ít nhất 1 đơn hàng để xóa!'
            );
          }
        },
      },
      {
        icon: 'pi pi-external-link',
        command: () => {
          if (this.selectedItems.length) {
            this.selectMultiItems(this.selectedItems);
          } else {
            this.toastServiceService.showToastWarning(
              'Hãy chọn ít nhất 1 đơn hàng để update!'
            );
          }
        },
      },
      {
        icon: 'pi pi-plus',
        command: () => {
          this.showAddModal();
        },
      },
    ];
  }

  private getData() {
    this.firebaseServiceService.fbQueryProducts().subscribe((res: any) => {
      console.log(res);
      res.sort((a: any, b: any) => (a.created < b.created ? 1 : -1));
      this.orders = res;
    });
  }

  valueChanged(event: any) {
    this.firebaseServiceService
      .fbUpdateProducts(
        {
          [event.header.field]: event.value,
        },
        event.item._id
      )
      .subscribe((res) => {
        this.toastServiceService.add({
          severity: 'success',
          summary: `Update [${event.item.customer}]`,
          detail: `[${event.header.name}] = ${event.value}`,
        });
        this.getData();
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
      contentStyle: { overflow: 'auto' },
      maximizable: true,
      baseZIndex: 10000,
      data: {
        data: this.headers,
        callBackAdded: (output: FacebookProduct) => {
          this.firebaseServiceService.fbAddProducts(output).subscribe((res) => {
            console.log('added', res);
            this.toastServiceService.showToastSuccess(
              `Added new order ${output.customer} successfully!`
            );
            // this.ref.close();
            // this.getData();
          });
        },
      },
    });

    this.ref.onClose.subscribe(() => {
      this.getData();
    });
  }

  contextMenuClick(event: {
    type: CONTEXT_MENU_EVENT;
    value: FacebookProduct;
  }) {
    console.log(event);
    switch (event.type) {
      case CONTEXT_MENU_EVENT.DELETE_ACCEPT:
        this.firebaseServiceService
          .fbDeleteProducts(event.value._id!)
          .subscribe(() => {
            this.toastServiceService.showToastSuccess(
              `Deleted record: ${event.value.customer}`
            );
            this.getData();
          });
        break;
      case CONTEXT_MENU_EVENT.DELETE_REJECT_CANCEL:
        break;

      default:
        break;
    }
  }

  selectMultiItems(items: FacebookProduct[]) {
    this.ref = this.dialogService.open(MultiHandlerModalComponent, {
      header: 'Cập nhật nhiều đơn hàng cùng lúc!',
      contentStyle: { overflow: 'auto' },
      maximizable: true,
      baseZIndex: 10000,
      data: {
        items,
        data: this.headers,
        callBackUpdated: (output: FacebookProduct, mess: string) => {
          this.confirmationService.confirm({
            message: mess,
            header: 'Update Confirmation',
            icon: 'pi pi-info-circle',
            rejectButtonStyleClass: 'bg-danger',
            accept: () => {
              alert('TOBE dev');
            },
            reject: () => {},
          });

          // this.firebaseServiceService.fbAddProducts(output).subscribe((res) => {
          //   console.log('added', res);
          //   this.toastServiceService.showToastSuccess(
          //     `Added new order ${output.customer} successfully!`
          //   );
          //   // this.ref.close();
          //   // this.getData();
          // });
        },
      },
    });

    this.ref.onClose.subscribe(() => {
      this.getData();
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
