import { CommonService } from '../../../shared/services/common.service';
import { STATUS_DROPDOWN } from '../../../shared/models';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { HeadersTable } from 'src/app/pages/facebook/custom-table/custom-table.component';
import { NO_IMG } from 'src/app/shared/utils';
import { FacebookProduct } from 'src/app/shared/models';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  data!: HeadersTable[];
  output: FacebookProduct | any = {};

  IMG_DEFAULT = NO_IMG;

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
    this.output.status = STATUS_DROPDOWN.ORDERED;
    this.output.weight_price = this.firebaseService.DEFAULT_WEIGHT_PRICE$.value;
    this.output.exchange = this.firebaseService.DEFAULT_EXCHANGE$.value;
  }

  changeValue(td: HeadersTable, value: any) {
    this.output[td.field] = value;
    console.log(td, value);
    console.log('output', this.output);
    this.output = JSON.parse(JSON.stringify(this.output));
  }

  submit() {
    console.log('Submit', this.output);
    if (!this.output.customer) {
      this.toastService.showToastWarning('Chưa nhập tên khách hàng!');
      return;
    }
    this.dialogService.data.callBackAdded(this.output);
  }

  close() {
    this.ref.close();
  }
}
