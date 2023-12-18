import { FirebaseService } from '../../../shared/services/firebase.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CONTEXT_MENU_EVENT, ICustomer } from '../../../shared/models';
import { ConfirmEventType, ConfirmationService, MenuItem } from 'primeng/api';
import { CommonService } from '../../../shared/services/common.service';
import { renderLink } from 'src/app/shared/utils';

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
  type: 'string' | 'link' | 'area';
  className?: string;
  headerClassName?: string;
  filter: ConfigFilterTable;
  styles?: any;
  defaultIfNoData?: any;
}

@Component({
  selector: 'customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss'],
})
export class CustomerTableComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() dataTable: ICustomer[] = [];
  @Input() headers!: HeadersTable[];
  @Output() valueChanged = new EventEmitter();
  @Output() selectMultiItems = new EventEmitter<ICustomer[]>();
  @Output() contextMenuOutput = new EventEmitter<{
    type: CONTEXT_MENU_EVENT;
    value: any;
  }>();

  @Input() selectedItems: ICustomer[] = [];
  @Input() isLoading!: boolean;
  selectedProduct!: ICustomer;
  contextMenu!: MenuItem[];
  renderLink = renderLink;

  constructor(
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private firebaseService: FirebaseService,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.contextMenu = [
      {
        label: 'Clone a copy',
        icon: 'pi pi-fw pi-copy',
        command: () => this.cloneACopy(),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.confirmDelete(),
      },
    ];
  }

  cloneACopy() {
    console.log('Copy a row', this.selectedItems);
    this.contextMenuOutput.emit({
      type: CONTEXT_MENU_EVENT.CLONE_A_COPY,
      value: this.selectedProduct,
    });
    this.selectedProduct = {};
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: `Do you want to delete this record: ${this.selectedProduct.name}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      rejectButtonStyleClass: 'bg-danger',
      accept: () => {
        this.contextMenuOutput.emit({
          type: CONTEXT_MENU_EVENT.DELETE_ACCEPT,
          value: this.selectedProduct,
        });
        this.selectedProduct = {};
      },
      reject: (type: ConfirmEventType) => {
        this.contextMenuOutput.emit({
          type: CONTEXT_MENU_EVENT.DELETE_REJECT_CANCEL,
          value: this.selectedProduct,
        });
        this.selectedProduct = {};
      },
    });
  }

  changeValue(item: ICustomer, header: HeadersTable, value: any) {
    console.log({ item }, header, value);
    this.valueChanged.emit({ item, header, value });
  }

  keyHandler(event: any, item: ICustomer, header: HeadersTable, value: any) {
    // console.log('keyHandler', item, event);
    if (event.key === 'Enter' || event.keyCode === 13) {
      console.log('Enter', item);
      this.changeValue(item, header, value);
    }
  }

  openMultiHandlerModal() {
    this.selectMultiItems.emit(this.selectedItems);
  }

  checkNewlyUpdate(updated: number) {
    return Date.now() - updated < 3000;
  }
}
