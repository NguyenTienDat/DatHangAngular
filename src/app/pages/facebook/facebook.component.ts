import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeadersTable } from './facebook-table/facebook-table.component';
import {
  CONTEXT_MENU_EVENT,
  FacebookProduct,
  ICustomer,
  STATUS_DROPDOWN,
  STATUS_LIST,
} from '../../shared/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddModalComponent } from './add-modal/add-modal.component';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ToastService } from '../../shared/services/toast.service';
import { MultiHandlerModalComponent } from './multi-handler-modal/multi-handler-modal.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { catchError, finalize, of, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

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
  customersList: ICustomer[] = [];

  constructor(
    private toastService: ToastService,
    public dialogService: DialogService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getActionsMenu();
    this.firebaseService.loadSetting(() => {
      this.firebaseService.getCustomers().subscribe((ls) => {
        this.customersList = ls;
        this.getTableHeader();
      });

      this.firebaseService.DROPDOWN_STATUS_SELECTED$.asObservable()
        .pipe(takeUntil(this.$destroy))
        .subscribe((status) => {
          this.getData(status);
        });
    });
  }

  private autoCalculatePrices(
    item: FacebookProduct,
    header: HeadersTable,
    value: any
  ) {
    console.log({ item }, header, value);
  }

  valueChanged(event: {
    item: FacebookProduct;
    header: HeadersTable;
    value: any;
  }) {
    console.log(event);
    const update: FacebookProduct = {
      [event.header.field]: event.value,
    };

    const updateFunc = () => {
      this.firebaseService
        .fbUpdateProduct(update, event?.item?._id || '')
        .pipe(takeUntil(this.$destroy),
        catchError((err) => {
          console.error('updateFunc err', err);
          return of(null);
        }))
        .subscribe(() => {
          this.toastService.add({
            severity: 'success',
            summary: `Updated [${event.item.customer}]`,
            detail: `[${event.header.name}] = ${event.value}`,
          });
          this.getData();
        });
    };
    if (
      event.header.type === 'number' &&
      event.header.field !== 'price' &&
      event.header.field !== 'price2'
    ) {
      this.confirmationService.confirm({
        message: 'Tự động tính giá bán, giá nhập?',
        header: 'Update confirmation',
        icon: 'pi pi-info-circle',
        rejectButtonStyleClass: 'bg-danger',
        accept: () => {
          this.commonService.autoCalculatePrices(
            event.item,
            event.header,
            event.value
          );
          update.price = event.item.price;
          update.price2 = event.item.price2;

          updateFunc();
        },
        reject: () => {
          updateFunc();
        },
      });
    } else {
      updateFunc();
    }
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
    // this.ref.onClose.subscribe(() => {
    //   this.getData();
    // });
  }

  contextMenuClick(event: {
    type: CONTEXT_MENU_EVENT;
    value: FacebookProduct;
  }) {
    console.log(event);
    switch (event.type) {
      case CONTEXT_MENU_EVENT.DELETE_ACCEPT:
        this.firebaseService.fbDeleteProduct(event.value._id!).subscribe(() => {
          this.toastService.showToastSuccess(
            `Deleted record: ${event.value.customer}`
          );
          this.getData();
        });
        break;
      case CONTEXT_MENU_EVENT.DELETE_REJECT_CANCEL:
        break;
      case CONTEXT_MENU_EVENT.CLONE_A_COPY:
        this.addItem(event.value);
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

    // this.ref.onClose.subscribe(() => {
    //   this.getData();
    // });
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
        type: 'dropdown',
        filter: {
          dropdownOptions: this.customersList,
          filterValue: [],
          matchMode: 'in',
        },
        styles: {
          wordBreak: 'break-all',
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
          filterValue: this.firebaseService.DROPDOWN_STATUS_SELECTED$.value,
          matchMode: 'in',
          noFilterOnRow: true,
        },
        styles: {
          width: '150px',
          'min-width': '150px',
          'text-align': 'center',
        },
      },
      {
        name: 'MVĐ',
        field: 'orderID',
        type: 'string',
        filter: {},
        styles: {
          'min-width': '50px',
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
                this.firebaseService
                  .fbDeleteProducts(this.selectedItems)
                  .subscribe((res) => {
                    this.toastService.showToastSuccess(
                      `Xóa ${this.selectedItems.length} đơn hàng thành công!`
                    );
                    this.getData();
                  });
              },
              reject: () => {},
            });
          } else {
            this.toastService.showToastWarning(
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
            this.toastService.showToastWarning(
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
    status: STATUS_DROPDOWN[] = this.firebaseService.DROPDOWN_STATUS_SELECTED$
      .value
  ) {
    this.isLoading = true;
    this.selectedItems = [];
    this.orders = [];
    this.firebaseService
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
    this.firebaseService
      .fbAddProducts(output)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        console.log('added', res);
        this.toastService.showToastSuccess(
          `Added new order ${output.customer} successfully!`
        );
        // this.ref.close();
        this.getData();
      });
  }

  private updateItem(
    output: FacebookProduct,
    items: FacebookProduct[],
    mess: string
  ) {
    this.isLoading = true;
    this.firebaseService
      .fbUpdateProducts(output, items)
      .pipe(
        takeUntil(this.$destroy),
        catchError((err) => {
          console.error('fbUpdateProducts err', err);
          return of(null)
        }),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((res) => {
        this.toastService.showToastSuccess(`${mess} successfully!`);
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
