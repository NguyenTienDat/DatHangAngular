import { ToastServiceService } from 'src/app/shared/services/toast-service.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NO_IMG, encodeImageFileAsURL, renderLink } from '../utils';
import { FacebookProduct } from '../models';
import { MenuItem } from 'primeng/api';

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
  defaultIfNoData?: any;
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

  selectedProduct!: FacebookProduct;
  items!: MenuItem[];
  renderLink = renderLink;
  IMG_DEFAULT = NO_IMG;

  constructor(private toastServiceService: ToastServiceService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'View',
        icon: 'pi pi-fw pi-search',
        command: () => this.viewProduct(this.selectedProduct),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteProduct(this.selectedProduct),
      },
    ];
  }

  viewProduct(product: FacebookProduct) {
    this.toastServiceService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: product.customer,
    });
  }

  deleteProduct(product: FacebookProduct) {
    console.log('delete', product);
  }

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
