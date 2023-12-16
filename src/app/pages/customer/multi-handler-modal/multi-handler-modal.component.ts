import { CommonService } from '../../../shared/services/common.service';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { renderLink } from 'src/app/shared/utils';
import { ICustomer, STATUS_CUSTOMER_ENUM } from 'src/app/shared/models';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HeadersTable } from '../customer-table/customer-table.component';

@Component({
  templateUrl: './multi-handler-modal.component.html',
  styleUrls: ['./multi-handler-modal.component.scss'],
})
export class MultiHandlerModalComponent implements OnInit {
  private header!: HeadersTable[];
  previewHeader: HeadersTable[] = [];
  willChangeHeader: HeadersTable[] | any[] = [];

  items = [];
  output: any = {};

  renderLink = renderLink;
  updateFields = new Map();

  constructor(
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    public firebaseService: FirebaseService,
    private toastService: ToastService,
    public commonService: CommonService
  ) {
    this.header = this.dialogService.data.data;
    this.items = this.dialogService.data.items;

    const visibleCol: any[] = [
      'name',
      'phone',
      'description',
      'link',
      'address',
    ];
    if (visibleCol.length) {
      this.previewHeader = this.header.filter((item) =>
        visibleCol.includes(item.field)
      );
    } else {
      this.previewHeader = this.header;
    }

    const willChangeCol = ['name', 'phone', 'description', 'link', 'address'];
    willChangeCol.forEach((item) => {
      this.updateFields.set(item, false);
    });
    this.willChangeHeader = this.header.filter((item) =>
      willChangeCol.includes(item.field)
    );
  }

  ngOnInit() {
    this.output.status = STATUS_CUSTOMER_ENUM.ACTIVE;
  }

  changeValue(td: HeadersTable, event: any) {
    (this.output as any)[td.field] = event;
    console.log(td, event);
    console.log('output', this.output);
    this.output = JSON.parse(JSON.stringify(this.output));
  }

  submit() {
    const updateInfo: any = {};
    let fieldsName = [];
    let countFieldsChange = 0;
    for (const key in this.output) {
      if (Object.prototype.hasOwnProperty.call(this.output, key)) {
        if (this.updateFields.get(key)) {
          updateInfo[key] = (this.output as any)[key];
          fieldsName.push(`[${key}]`);
          countFieldsChange++;
        }
      }
    }
    if (!this.output.name && this.updateFields.get('name')) {
      this.toastService.showToastWarning('Tên KH đang trống');
      return;
    }
    if (!this.output.address && this.updateFields.get('address')) {
      this.toastService.showToastWarning('Địa chỉ khách hàng đang trống');
      return;
    }
    if (!this.output.address && this.updateFields.get('address')) {
      this.toastService.showToastWarning('Địa chỉ khách hàng đang trống');
      return;
    }
    if (!this.output.link && this.updateFields.get('link')) {
      this.toastService.showToastWarning('Link khách hàng đang trống');
      return;
    }
    if (!this.output.phone && this.updateFields.get('phone')) {
      this.toastService.showToastWarning('Sđt khách hàng đang trống');
      return;
    }
    if (JSON.stringify(updateInfo) === '{}') {
      this.toastService.showToastWarning(
        'Bạn không chọn trường nào để cập nhật!'
      );
      return;
    }
    console.log({ updateInfo });

    this.dialogService.data.callBackUpdated(
      updateInfo,
      `Cập nhật ${countFieldsChange} thông tin  ${fieldsName.join(', ')} cho ${
        this.items.length
      } khách hàng.`
    );
  }

  checkedChange(checked: boolean, field: string) {
    this.updateFields.set(field, checked);
  }

  close() {
    this.ref.close();
  }
}
