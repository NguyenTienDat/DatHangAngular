import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeadersTable } from './customer-table/customer-table.component';
import {
  CONTEXT_MENU_EVENT,
  ICustomer,
  STATUS_LIST,
} from '../../shared/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddModalComponent } from './add-modal/add-modal.component';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ToastService } from '../../shared/services/toast.service';
import { MultiHandlerModalComponent } from './multi-handler-modal/multi-handler-modal.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit, OnDestroy {
  headers: HeadersTable[] = [];
  actionMenuItems!: MenuItem[];

  customersList = [];

  ref!: DynamicDialogRef;
  selectedItems: ICustomer[] = [];
  isEditMode = true;
  isLoading = true;
  $destroy = new Subject<void>();

  constructor(
    private toastService: ToastService,
    public dialogService: DialogService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getTableHeader();
    this.getActionsMenu();
    this.firebaseService.loadSetting(() => {
      this.getData();
    });
  }

  valueChanged(event: { item: ICustomer; header: HeadersTable; value: any }) {
    console.log(event);
    const update: ICustomer = {
      [event.header.field]: event.value,
    } as any;
    this.firebaseService
      .updateCustomer(update, event.item._id!)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.toastService.add({
          severity: 'success',
          summary: `Updated [${event.item.name}]`,
          detail: `[${event.header.name}] = ${event.value}`,
        });
        this.getData();
      });
  }

  showAddModal() {
    this.ref = this.dialogService.open(AddModalComponent, {
      header: 'Khách hàng mới',
      contentStyle: { overflow: 'auto' },
      maximizable: true,
      baseZIndex: 10000,
      data: {
        data: this.headers,
        callBackAdded: (output: ICustomer) => {
          this.addItem(output);
        },
      },
    });
  }

  contextMenuClick(event: { type: CONTEXT_MENU_EVENT; value: ICustomer }) {
    console.log(event);
    switch (event.type) {
      case CONTEXT_MENU_EVENT.DELETE_ACCEPT:
        this.firebaseService.deleteCustomer(event.value._id!).subscribe(() => {
          this.toastService.showToastSuccess(
            `Deleted customer: ${event.value.name}`
          );
          this.getData();
        });
        break;
      case CONTEXT_MENU_EVENT.CLONE_A_COPY:
        this.addItem(event.value);
        break;
      default:
        break;
    }
  }

  selectMultiItems(items: ICustomer[]) {
    this.ref = this.dialogService.open(MultiHandlerModalComponent, {
      header: 'Cập nhật khách hàng cùng lúc!',
      contentStyle: { overflow: 'auto' },
      maximizable: true,
      baseZIndex: 10000,
      data: {
        items,
        data: this.headers,
        callBackUpdated: (output: ICustomer, mess: string) => {
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
        name: 'Tên KH',
        field: 'name',
        type: 'link',
        className: 'custom-link',
        filter: {},
        styles: {
          //'min-width': '250px',
          //width: '250px',
        },
      },
      {
        name: 'SĐT',
        field: 'phone',
        type: 'string',
        filter: {},
        styles: {
          //width: '160px',
          //'min-width': '160px',
          'text-align': 'center',
        },
      },
      {
        name: 'Link',
        field: 'link',
        type: 'link',
        className: 'custom-link',
        filter: {},
        styles: {
          //'min-width': '150px',
          //width: '150px',
        },
      },
      {
        name: 'Ghi chú',
        field: 'description',
        type: 'area',
        filter: {},
        styles: {
          wordBreak: 'break-all',
          //width: '350px',
          //'min-width': '300px',
        },
      },
      {
        name: 'Địa chỉ',
        field: 'address',
        type: 'area',
        filter: {},
        styles: {
          wordBreak: 'break-all',
          //width: '100%',
          //'min-width': '100px',
        },
      },
      {
        name: 'ID',
        field: '_id',
        type: 'string',
        filter: {},
        styles: {
          //'min-width': '250px',
          width: '200px',
        },
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
              message: `Xóa ${this.selectedItems.length} khách hàng đang chọn?`,
              header: 'Delete Confirmation',
              icon: 'pi pi-info-circle',
              acceptButtonStyleClass: 'bg-danger',
              rejectButtonStyleClass: 'bg-success',
              defaultFocus: 'reject',
              accept: () => {
                this.firebaseService
                  .deleteCustomers(this.selectedItems)
                  .subscribe((res) => {
                    this.toastService.showToastSuccess(
                      `Xóa ${this.selectedItems.length} khách hàng thành công!`
                    );
                    this.getData();
                  });
              },
              reject: () => {},
            });
          } else {
            this.toastService.showToastWarning(
              'Hãy chọn ít nhất 1 khách hàng để xóa!'
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
              'Hãy chọn ít nhất 1 khách hàng để update!'
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
    this.isLoading = true;
    this.selectedItems = [];
    this.customersList = [];
    this.firebaseService
      .getCustomers()
      .pipe(
        takeUntil(this.$destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res: any) => {
        console.log(res);
        res.sort((a: ICustomer, b: ICustomer) =>
          (a.updated ?? 0) < (b.updated ?? 0) ? 1 : -1
        );
        this.customersList = res;
      });
  }

  private addItem(output: ICustomer) {
    this.firebaseService
      .addCustomer(output)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        console.log('added', res);
        this.toastService.showToastSuccess(
          `Added new customer ${output.name} successfully!`
        );
        // this.ref.close();
        this.getData();
      });
  }

  private updateItem(output: ICustomer, items: ICustomer[], mess: string) {
    this.isLoading = true;
    this.firebaseService
      .updateCustomers(output, items)
      .pipe(
        takeUntil(this.$destroy),
        finalize(() => (this.isLoading = false))
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
