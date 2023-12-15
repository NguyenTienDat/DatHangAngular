import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HeadersTable } from '../custom-table/custom-table.component';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private _decimalPipe: DecimalPipe,
    private firebaseService: FirebaseService
  ) {}

  transformDecimal(num: number) {
    return this._decimalPipe.transform(num, '1.');
  }

  autoCalculatePrices(output: any, td: HeadersTable, value: string | number) {
    output[td.field] = value;
    console.log(td);

    //if (td.field !== 'price' && td.field !== 'price2') {
    // gia nhap = tệ * tỉ giá + cân * giá cân
    // gia ban = gia nhap + 35k
    const product_cny = output.CNY_price ?? 0;
    const product_weight = output.weight ?? 0;
    const product_weight_price = output.weight_price ?? 0;
    const product_exchange = output.exchange ?? 0;
    // console.log('product_cny', product_cny);
    // console.log('product_weight', product_weight);
    // console.log('product_weight_price', product_weight_price);
    // console.log('product_exchange', product_exchange);

    const giaNhap =
      product_cny * product_exchange + product_weight * product_weight_price;

    // if (!output.price) {
    output.price = giaNhap;
    output.tooltip_price = `= (Tệ x Tỉ giá) + (Cân x Giá Cân) \n= (${this.transformDecimal(
      product_cny
    )} x ${this.transformDecimal(product_exchange)}) + (${this.transformDecimal(
      product_weight
    )} x ${this.transformDecimal(product_weight_price)})`;
    // }

    // if (!output.price2) {
    output.tooltip_price2 = `= (Giá nhập + Tiền công) x VAT \n= (${this.transformDecimal(
      giaNhap
    )} + ${this.transformDecimal(
      this.firebaseService.INCOME_PER_ORDER$.value
    )}) x ${this.transformDecimal(this.firebaseService.VAT$.value)}`;
    output.price2 =
      (giaNhap + this.firebaseService.INCOME_PER_ORDER$.value) *
      this.firebaseService.VAT$.value;
    // }

    output = JSON.parse(JSON.stringify(output));
    //  }
    // this.changeValue(td, value);
  }
}
