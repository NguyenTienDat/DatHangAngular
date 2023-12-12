import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private _decimalPipe: DecimalPipe) {}

  transformDecimal(num: number) {
    return this._decimalPipe.transform(num, '1.');
  }
}
