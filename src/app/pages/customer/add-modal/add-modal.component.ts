import { CommonService } from '../../../shared/services/common.service';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HeadersTable } from '../customer-table/customer-table.component';
import { ICustomer, STATUS_CUSTOMER_ENUM } from 'src/app/shared/models';

@Component({
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  data!: HeadersTable[];
  output: any = {};

  constructor(
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    public firebaseService: FirebaseService,
    private toastService: ToastService,
    public commonService: CommonService
  ) {
    this.data = this.dialogService.data.data;
  }

  ngOnInit() {
    this.output.status = STATUS_CUSTOMER_ENUM.ACTIVE;
  }

  changeValue(td: HeadersTable, value: any) {
    this.output[td.field] = value;
    console.log(td, value);
    console.log('output', this.output);
    this.output = JSON.parse(JSON.stringify(this.output));
  }

  submit() {
    console.log('Submit', this.output);
    if (!this.output.name) {
      this.toastService.showToastWarning('Chưa nhập tên khách hàng!');
      return;
    }
    this.dialogService.data.callBackAdded(this.output);
  }

  close() {
    this.ref.close();
  }
}
