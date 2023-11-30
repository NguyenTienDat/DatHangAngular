import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { HeadersTable } from 'src/app/shared/custom-table/custom-table.component';
import { NO_IMG } from 'src/app/shared/utils';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  data!: HeadersTable[];
  IMG_DEFAULT = NO_IMG;

  constructor(
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.data = this.dialogService.data;
  }

  ngOnInit() {}

  changeValue(td: any, event: any) {
    console.log(td, event);
  }

  close() {
    this.ref.close();
  }
}
