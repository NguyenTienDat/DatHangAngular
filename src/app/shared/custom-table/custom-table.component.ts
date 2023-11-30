import { Component, Input, OnInit } from '@angular/core';
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
  renderLink = renderLink;
  IMG_DEFAULT = NO_IMG;

  constructor() {}

  ngOnInit() {}

  openSelectFile(item: any, field: string, e: any, image: any) {
    e.data = {
      item,
      field,
      image,
    };
    e.click();
  }

  changeValue(item: any, field: string, value: any) {
    console.log({ item }, field, value);
  }

  changeImg(fileElement: any, event: any) {
    console.log({ fileElement }, event);
    encodeImageFileAsURL(fileElement, (src: any) => {
      fileElement.data.image.src = src;
    });
  }
}
