import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NO_IMG, encodeImageFileAsURL, renderLink } from '../utils';

interface ConfigFilterTable {
  noFilter?: boolean;
  /** Model to show dropdown - Need config dropdownOptions */
  dropdownOptions?: any[];
  /** Cần để binding lưu trữ giá trị đang filter trên UI */
  filterValue?: any;
  matchMode?:
    | 'endsWith'
    | 'startsWith'
    | 'contains'
    | 'equals'
    | 'notEquals'
    | 'in'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte';
}
export interface HeadersTable {
  name: string;
  field: string;
  type: 'string' | 'image' | 'number' | 'link' | 'dropdown';
  className?: string;
  headerClassName?: string;
  filter: ConfigFilterTable;
  styles?: any;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() dataTable = [];
  @Input() headers!: HeadersTable[];
  @Output() valueChanged = new EventEmitter();

  renderLink = renderLink;
  IMG_DEFAULT = NO_IMG;

  constructor() {}

  ngOnInit() {}

  openSelectFile(item: any, field: string, inputImg: any, image: any) {
    inputImg.data = {
      item,
      field,
      image,
    };
    inputImg.click();
  }

  changeValue(item: any, header: HeadersTable, value: any) {
    console.log({ item }, header, value);
    this.valueChanged.emit({ item, header, value });
  }

  changeImg(fileElement: any, event: any) {
    console.log({ fileElement }, event);
    encodeImageFileAsURL(fileElement, (src: any) => {
      fileElement.data.image.src = src;
    });
  }
}
