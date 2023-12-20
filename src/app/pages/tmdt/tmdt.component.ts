import { Component, OnInit, OnDestroy } from '@angular/core';
import { CONTEXT_MENU_EVENT, ITmdt, PROPS } from '../../shared/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ToastService } from '../../shared/services/toast.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { finalize, Subject, takeUntil } from 'rxjs';
import { HeadersTable } from './tmdt-table/tmdt-table.component';
@Component({
  selector: 'app-tmdt',
  templateUrl: './tmdt.component.html',
  styleUrls: ['./tmdt.component.scss'],
})
export class TmdtComponent implements OnInit, OnDestroy {
  numberDefaultConfig: HeadersTable = {
    name: '',
    field: '',
    type: 'number',
    filter: { noFilter: true },
    styles: {
      'text-align': 'right',
    },
  };

  headers: HeadersTable[] = [];
  actionMenuItems!: MenuItem[];
  orders: ITmdt[] = [];
  ref!: DynamicDialogRef;
  isLoading = true;
  $destroy = new Subject<void>();

  constructor(
    private toastService: ToastService,
    public dialogService: DialogService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getTableHeader();
    this.firebaseService.loadSetting(() => {
      this.getData();
    });
  }

  valueChanged(event: { item: ITmdt; header: HeadersTable; value: any }) {
    // console.log(event);
    // const update: ITmdt = {
    //   [event.header.field]: event.value,
    // };
    // this.firebaseService
    //   .fbUpdateProduct(update, event.item._id!)
    //   .pipe(takeUntil(this.$destroy))
    //   .subscribe(() => {
    //     this.toastService.add({
    //       severity: 'success',
    //       summary: `Updated [${event.item.customer}]`,
    //       detail: `[${event.header.name}] = ${event.value}`,
    //     });
    //     this.getData();
    //   });
  }

  showAddModal() {
    // this.ref = this.dialogService.open(AddModalComponent, {
    //   header: 'Đơn hàng mới',
    //   contentStyle: { overflow: 'auto' },
    //   maximizable: true,
    //   baseZIndex: 10000,
    //   data: {
    //     data: this.headers,
    //     callBackAdded: (output: FacebookProduct) => {
    //       this.addItem(output);
    //     },
    //   },
    // });
    // this.ref.onClose.subscribe(() => {
    //   this.getData();
    // });
  }

  contextMenuClick(event: { type: CONTEXT_MENU_EVENT; value: ITmdt }) {
    console.log(event);
    // switch (event.type) {
    //   case CONTEXT_MENU_EVENT.DELETE_ACCEPT:
    //     this.firebaseService.fbDeleteProduct(event.value._id!).subscribe(() => {
    //       this.toastService.showToastSuccess(
    //         `Deleted record: ${event.value.customer}`
    //       );
    //       this.getData();
    //     });
    //     break;
    //   case CONTEXT_MENU_EVENT.DELETE_REJECT_CANCEL:
    //     break;
    //   case CONTEXT_MENU_EVENT.CLONE_A_COPY:
    //     this.addItem(event.value);
    //     break;
    //   default:
    //     break;
    // }
  }

  private getTableHeader() {
    this.headers = [
      {
        name: 'SKU',
        field: 'sku',
        type: 'string',
        filter: {},
        styles: {
          'text-align': 'center',
        },
      },
      {
        name: 'Image',
        field: 'imageLink',
        type: 'image',
        className: 'image-col',
        filter: { noFilter: true },
        styles: {
          'text-align': 'center',
        },
      },
      {
        name: 'MÀU',
        field: 'prop_color',
        type: 'string',
        filter: {},
        styles: {
          'text-align': 'center',
        },
      },
      {
        name: 'SIZE',
        field: 'prop_size',
        type: 'string',
        filter: {},
        styles: {
          'text-align': 'center',
        },
      },
      {
        ...this.numberDefaultConfig,
        name: 'ĐÃ NHẬP',
        field: 'quantity',
      },
      {
        ...this.numberDefaultConfig,
        name: 'ĐÃ BÁN',
        field: 'orderID',
      },
      {
        ...this.numberDefaultConfig,
        name: 'GIÁ VỐN',
        field: 'price',
        className: 'text-danger',
      },
      {
        ...this.numberDefaultConfig,
        name: 'DOANH THU',
        className: 'text-danger',
      },
      {
        name: 'UPDATE',
        field: '',
        className: 'text-danger',
        type: 'string',
        filter: {},
        styles: {
          'text-align': 'center',
        },
      },
    ];
  }

  private getData() {
    this.isLoading = true;
    this.orders = [];
    this.firebaseService
      .getTmdt()
      .pipe(
        takeUntil(this.$destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res: any) => {
        console.log(res);
        res.sort((a: any, b: any) => (a.created < b.created ? 1 : -1));
        this.orders = this.groupByProps(res);
        this.orders = this.mergeColsRows(this.orders);
      });
  }

  private mergeColsRows(ls: ITmdt[]): ITmdt[] {
    let _ls: ITmdt[] = JSON.parse(JSON.stringify(ls));
    let skuState = {
      rowspan: 0,
      currentSku: '',
      currentIndex: 0,
    };
    let colorState = {
      rowspan: 0,
      current: '',
      currentIndex: 0,
    };

    let sizeState = {
      rowspan: 0,
      current: '',
      currentIndex: 0,
    };

    function setSKU(i: number, item: ITmdt) {
      (_ls[skuState.currentIndex] as any)['_rowspan_' + 'sku'] =
        skuState.rowspan;
      (_ls[skuState.currentIndex] as any)['_rowspan_' + 'imageLink'] =
        skuState.rowspan;
      skuState.currentIndex = i;
      skuState.rowspan = 1;
      skuState.currentSku = item.sku ?? '';
    }
    function setColor(i: number, item: ITmdt, isSet = true) {
      (_ls[colorState.currentIndex] as any)['_rowspan_' + 'prop_color'] =
        colorState.rowspan;
      colorState.currentIndex = i;
      colorState.rowspan = 1;
      colorState.current = item.prop_color ?? '';
    }
    function setSize(i: number, item: ITmdt) {
      (_ls[sizeState.currentIndex] as any)['_rowspan_' + 'prop_size'] =
        sizeState.rowspan;
      sizeState.currentIndex = i;
      sizeState.rowspan = 1;
      sizeState.current = item.prop_size ?? '';
    }

    for (let i = 0; i < _ls.length; i++) {
      const item = _ls[i];
      console.log(item);

      if (item.sku === skuState.currentSku) {
        (_ls[i] as any)['_hide_' + 'sku'] = true;
        (_ls[i] as any)['_hide_' + 'imageLink'] = true;
        skuState.rowspan++;
        if (i == _ls.length - 1) {
          setSKU(i, item);
        }
        if (item.prop_color === colorState.current) {
          (_ls[i] as any)['_hide_' + 'prop_color'] = true;
          colorState.rowspan++;
          if (i == _ls.length - 1) {
            setColor(i, item);
          }
        } else {
          setColor(i, item);
          if (item.prop_size === sizeState.current) {
            (_ls[i] as any)['_hide_' + 'prop_size'] = true;
            sizeState.rowspan++;
            if (i == _ls.length - 1) {
              setSize(i, item);
            }
          } else {
            setSize(i, item);
          }
        }
      } else {
        setSKU(i, item);
        setColor(i, item);
        setSize(i, item);
      }
    }
    console.log(_ls);
    return _ls;
  }
  private groupByProps(ls: ITmdt[]) {
    const propsId = PROPS().map((it) => it.id);
    let _ls = JSON.parse(JSON.stringify(ls));
    console.log('propsId', propsId);
    console.log('groupByProps before sort', ls);
    const result = _ls.sort((a: any, b: any) => {
      if (a.sku === b.sku) {
        if (a[propsId[0]] === b[propsId[0]]) {
          if (a[propsId[1]] === b[propsId[1]]) {
            return (a.created || 0) < (b.created || 0) ? 1 : -1;
          } else {
            return (+a[propsId[1]] ?? 0) > (+b[propsId[1]] ?? 0) ? 1 : -1;
          }
        } else {
          return a[propsId[0]] > b[propsId[0]] ? 1 : -1;
        }
      } else {
        return a.sku > b.sku ? 1 : -1;
      }
    });
    console.log('groupByProps', result);
    return result;
  }

  private addItem(output: ITmdt) {
    this.firebaseService
      .addTMDT(output)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        console.log('added', res);
        this.toastService.showToastSuccess(
          `Added new order ${output.sku} successfully!`
        );
        // this.ref.close();
        this.getData();
      });
  }

  private updateItem(output: ITmdt, items: ITmdt[], mess: string) {
    this.isLoading = true;
    this.firebaseService
      .fbUpdateProducts(output, items)
      .pipe(
        takeUntil(this.$destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        this.toastService.showToastSuccess(`${mess} successfully!`);
        this.ref.close();
        this.getData();
      });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
    if (this.ref) {
      this.ref.close();
    }
  }
}
