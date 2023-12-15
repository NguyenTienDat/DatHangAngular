import { CommonService } from '../../shared/services/common.service';
import { STATUS_DROPDOWN } from '../../shared/models';
import { FirebaseService } from '../../shared/services/firebase.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeadersTable } from 'src/app/shared/custom-table/custom-table.component';
import { NO_IMG, encodeImageFileAsURL, renderLink } from 'src/app/shared/utils';
import { FacebookProduct } from 'src/app/shared/models';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-multi-handler-modal',
  templateUrl: './multi-handler-modal.component.html',
  styleUrls: ['./multi-handler-modal.component.scss'],
})
export class MultiHandlerModalComponent implements OnInit {
  private header!: HeadersTable[];
  previewHeader: HeadersTable[] = [];
  willChangeHeader: HeadersTable[] | any[] = [];

  items = [];
  output: FacebookProduct | any = {};

  IMG_DEFAULT = NO_IMG;
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

    const visibleCol = ['imageLink', 'customer', 'description', 'status'];
    this.previewHeader = this.header.filter((item) =>
      visibleCol.includes(item.field)
    );

    const willChangeCol = [
      'imageLink',
      'status',
      'CNY_price',
      'exchange',
      'weight_price',
      'orderID',
      'customer',
      'price',
      'price2',
      'weight',
    ];
    willChangeCol.forEach((item) => {
      this.updateFields.set(item, false);
    });
    this.willChangeHeader = this.header.filter((item) =>
      willChangeCol.includes(item.field)
    );
  }

  ngOnInit() {
    this.output.status = STATUS_DROPDOWN.ORDERED;
    this.output.weight_price = this.firebaseService.DEFAULT_WEIGHT_PRICE$.value;
    this.output.exchange = this.firebaseService.DEFAULT_EXCHANGE$.value;
  }

  changeValue(td: any, event: any) {
    this.output[td.field] = event;
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
          updateInfo[key] = this.output[key];
          fieldsName.push(`[${key}]`);
          countFieldsChange++;
        }
      }
    }
    if (!this.output.imageLink && this.updateFields.get('imageLink')) {
      this.toastService.showToastWarning('Chưa chọn ảnh');
      return;
    }
    if (!this.output.orderID && this.updateFields.get('orderID')) {
      this.toastService.showToastWarning('Mã vận đơn đang trống');
      return;
    }
    if (!this.output.customer && this.updateFields.get('customer')) {
      this.toastService.showToastWarning('Tên khách hàng đang trống');
      return;
    }
    if (
      (isNaN(this.output.CNY_price) || !this.output.CNY_price) &&
      this.updateFields.get('CNY_price')
    ) {
      this.toastService.showToastWarning('Tệ đang bị bỏ trống');
      return;
    }
    if (
      (isNaN(this.output.price) || !this.output.price) &&
      this.updateFields.get('price')
    ) {
      this.toastService.showToastWarning('Giá nhập đang bị bỏ trống');
      return;
    }
    if (
      (isNaN(this.output.price2) || !this.output.price2) &&
      this.updateFields.get('price2')
    ) {
      this.toastService.showToastWarning('Giá bán đang bị bỏ trống');
      return;
    }
    if (
      (isNaN(this.output.weight) || !this.output.weight) &&
      this.updateFields.get('weight')
    ) {
      this.toastService.showToastWarning('Cân đang bị bỏ trống');
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
      } đơn hàng.`
    );
  }

  checkedChange(checked: boolean, field: string) {
    this.updateFields.set(field, checked);
  }

  close() {
    this.ref.close();
  }
}
