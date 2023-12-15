import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeadersTable } from '../shared/custom-table/custom-table.component';
import {
  CONTEXT_MENU_EVENT,
  FacebookProduct,
  STATUS_DROPDOWN,
  STATUS_LIST,
} from '../shared/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddModalComponent } from './add-modal/add-modal.component';
import { FirebaseServiceService } from '../shared/services/firebase-service.service';
import { ToastServiceService } from '../shared/services/toast-service.service';
import { MultiHandlerModalComponent } from './multi-handler-modal/multi-handler-modal.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { finalize, Subject, takeUntil } from 'rxjs';

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

  headers: HeadersTable[] = [];
  actionMenuItems!: MenuItem[];

  orders = [];

  ref!: DynamicDialogRef;
  selectedItems: FacebookProduct[] = [];
  isEditMode = false;
  isLoading = true;
  $destroy = new Subject<void>();

  constructor(
    private toastServiceService: ToastServiceService,
    public dialogService: DialogService,
    private firebaseServiceService: FirebaseServiceService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getTableHeader();
    this.getActionsMenu();
    this.firebaseServiceService.DROPDOWN_STATUS_SELECTED$.asObservable()
      .pipe(takeUntil(this.$destroy))
      .subscribe((status) => {
        this.getData(status);
      });
  }

  valueChanged(event: any) {
    this.firebaseServiceService
      .fbUpdateProduct(
        {
          [event.header.field]: event.value,
        },
        event.item._id
      )
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.toastServiceService.add({
          severity: 'success',
          summary: `Updated [${event.item.customer}]`,
          detail: `[${event.header.name}] = ${event.value}`,
        });
        this.getData();
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
          this.addItem(output);
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
          .fbDeleteProduct(event.value._id!)
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
          console.log({ output });
          this.confirmationService.confirm({
            message: mess,
            header: 'Update Confirmation',
            icon: 'pi pi-info-circle',
            rejectButtonStyleClass: 'bg-danger',
            accept: () => {
              this.updateItem(output, items, mess);
            },
            reject: () => {},
          });
        },
      },
    });

    this.ref.onClose.subscribe(() => {
      this.getData();
    });
  }

  private getTableHeader() {
    this.headers = [
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
          filterValue:
            this.firebaseServiceService.DROPDOWN_STATUS_SELECTED$.value,
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
  }

  private getActionsMenu() {
    this.actionMenuItems = [
      {
        icon: this.isEditMode ? 'pi pi-eye' : 'pi pi-pencil',
        tooltip: this.isEditMode
          ? 'Sửa nhiều dòng cùng lúc'
          : 'Trở về chế độ xem',
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
        tooltip: 'Xóa các dòng đã chọn',
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
                this.firebaseServiceService
                  .fbDeleteProducts(this.selectedItems)
                  .subscribe((res) => {
                    this.toastServiceService.showToastSuccess(
                      `Xóa ${this.selectedItems.length} đơn hàng thành công!`
                    );
                    this.getData();
                  });
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

  private getData(
    status: STATUS_DROPDOWN[] = this.firebaseServiceService
      .DROPDOWN_STATUS_SELECTED$.value
  ) {
    this.isLoading = true;
    this.selectedItems = [];
    this.orders = [];
    this.firebaseServiceService
      .fbQueryProducts(status)
      .pipe(
        takeUntil(this.$destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res: any) => {
        console.log(res);
        res.sort((a: any, b: any) => (a.created < b.created ? 1 : -1));
        this.orders = res;
      });
  }

  private addItem(output: FacebookProduct) {
    this.firebaseServiceService
      .fbAddProducts(output)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        console.log('added', res);
        this.toastServiceService.showToastSuccess(
          `Added new order ${output.customer} successfully!`
        );
        // this.ref.close();
        // this.getData();
      });
  }

  private updateItem(
    output: FacebookProduct,
    items: FacebookProduct[],
    mess: string
  ) {
    this.isLoading = true;
    this.firebaseServiceService
      .fbUpdateProducts(output, items)
      .pipe(
        takeUntil(this.$destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        this.toastServiceService.showToastSuccess(`${mess} successfully!`);
        this.ref.close();
        this.getData();
      });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
    if (this.ref) {
      this.ref.close();
    }
  }
}
