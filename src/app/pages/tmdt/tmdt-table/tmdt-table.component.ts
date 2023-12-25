import { FirebaseService } from '../../../shared/services/firebase.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  NO_IMG,
  encodeImageFileAsURL,
  renderLink,
} from '../../../shared/utils';
import { CONTEXT_MENU_EVENT, ITmdt } from '../../../shared/models';
import { ConfirmEventType, ConfirmationService, MenuItem } from 'primeng/api';
import { CommonService } from '../../../shared/services/common.service';

interface ConfigFilterTable {
  noFilter?: boolean; // on header
  noFilterOnRow?: boolean;
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
  type: 'string' | 'image' | 'number';
  className?: string;
  headerClassName?: string;
  filter: ConfigFilterTable;
  styles?: any;
  defaultIfNoData?: any;
  rowspan?: any;
  colspan?: any;
}

@Component({
  selector: 'tmdt-table',
  templateUrl: './tmdt-table.component.html',
  styleUrls: ['./tmdt-table.component.scss'],
})
export class TmdtTableComponent implements OnInit, OnChanges {
  @Input() dataTable: ITmdt[] = [];
  @Input() headers!: HeadersTable[];
  @Output() valueChanged = new EventEmitter();
  @Output() contextMenuOutput = new EventEmitter<{
    type: CONTEXT_MENU_EVENT;
    value: any;
  }>();

  @Input() isLoading!: boolean;
  selectedItem!: ITmdt;
  contextMenu!: MenuItem[];
  renderLink = renderLink;
  IMG_DEFAULT = NO_IMG;
  currentTime = Date.now();

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

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTime = Date.now();
  }

  cloneACopy() {
    this.contextMenuOutput.emit({
      type: CONTEXT_MENU_EVENT.CLONE_A_COPY,
      value: this.selectedItem,
    });
    this.selectedItem = {};
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: `Do you want to delete this record: ${this.selectedItem.sku}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      rejectButtonStyleClass: 'bg-danger',
      accept: () => {
        this.contextMenuOutput.emit({
          type: CONTEXT_MENU_EVENT.DELETE_ACCEPT,
          value: this.selectedItem,
        });
        this.selectedItem = {};
      },
      reject: (type: ConfirmEventType) => {
        this.contextMenuOutput.emit({
          type: CONTEXT_MENU_EVENT.DELETE_REJECT_CANCEL,
          value: this.selectedItem,
        });
        this.selectedItem = {};
      },
    });
  }

  openSelectFile(item: any, field: string, inputImg: any, image: any) {
    inputImg.data = {
      item,
      field,
      image,
    };
    inputImg.click();
  }

  changeValue(item: ITmdt, header: HeadersTable, value: any) {
    console.log({ item }, header, value);
    this.valueChanged.emit({ item, header, value });
  }

  changeImg(fileElement: any, event: any) {
    console.log({ fileElement }, event);
    encodeImageFileAsURL(fileElement, (src: any) => {
      fileElement.data.image.src = src;
      this.valueChanged.emit({
        item: fileElement.data.item,
        header: { field: fileElement.data.field },
        value: src,
      });
    });
  }

  keyHandler(event: any, item: ITmdt, header: HeadersTable, value: any) {
    // console.log('keyHandler', item, event);
    if (event.key === 'Enter' || event.keyCode === 13) {
      console.log('Enter', item);
      this.changeValue(item, header, value);
    }
  }

  checkNewlyUpdate(updated: number) {
    return Date.now() - updated < 3000;
  }
}
