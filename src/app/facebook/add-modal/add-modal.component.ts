import { FirebaseServiceService } from '../../shared/services/firebase-service.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { HeadersTable } from 'src/app/shared/custom-table/custom-table.component';
import { NO_IMG } from 'src/app/shared/utils';
import { FacebookProduct } from 'src/app/shared/models';

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
    private firebaseServiceService: FirebaseServiceService
  ) {
    this.data = this.dialogService.data;
  }

  ngOnInit() {
    this.output.weight_price =
      this.firebaseServiceService.DEFAULT_WEIGHT_PRICE$.value;
    this.output.exchange = this.firebaseServiceService.DEFAULT_EXCHANGE$.value;
  }

  changeValue(td: any, event: any) {
    this.output[td.field] = event;
    console.log(td, event);
    console.log('output', this.output);
    this.output = JSON.parse(JSON.stringify(this.output));
  }

  submit() {
    console.log('Submit', this.output);
  }

  close() {
    this.ref.close();
  }

  autoCalculatePrices(td: any, event: any) {
    this.output[td.field] = event;
    if (td !== 'price' && td !== 'price2') {
      // gia nhap = tệ * tỉ giá + cân * giá cân
      // gia ban = gia nhap + 35k
      const product_cny = this.output.CNY_price ?? 0;
      const product_weight = this.output.weight ?? 0;
      const product_weight_price = this.output.weight_price ?? 0;
      const product_exchange = this.output.exchange ?? 0;
      // console.log('product_cny', product_cny);
      // console.log('product_weight', product_weight);
      // console.log('product_weight_price', product_weight_price);
      // console.log('product_exchange', product_exchange);

      const giaNhap =
        product_cny * product_exchange + product_weight * product_weight_price;

      if (!this.output.price) {
        this.output.price = giaNhap;
      }

      if (!this.output.price2) {
        this.output.price2 =
          giaNhap + this.firebaseServiceService.INCOME_PER_ORDER$.value;
      }

      this.output = JSON.parse(JSON.stringify(this.output));
    }

    this.changeValue(td, event);
  }
}
