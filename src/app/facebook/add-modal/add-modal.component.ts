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
    console.log(td, event);
    console.log('output', this.output);
  }

  submit() {
    console.log('Submit', this.output);
  }

  close() {
    this.ref.close();
  }
}
