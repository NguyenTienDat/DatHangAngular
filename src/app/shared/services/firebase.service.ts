import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
  getFirestore,
  doc,
  onSnapshot,
  docSnapshots,
  where,
  CollectionReference,
  query,
  Query,
  DocumentData,
  orderBy,
  addDoc,
  deleteDoc,
  updateDoc,
  writeBatch,
  runTransaction,
  Transaction,
} from '@angular/fire/firestore';
import { Observable, from, BehaviorSubject, catchError, forkJoin } from 'rxjs';
import { ENVIRONMENT_LIST, FacebookProduct, STATUS_DROPDOWN } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private PRODUCTS_COLLECTION = 'products';
  private SETTING_COLLECTION = 'setting';

  private productsCol!: CollectionReference;
  private settingCol: CollectionReference;
  /**
   * Tiền vận chuyển / 1kg hiện tại
   */
  DEFAULT_WEIGHT_PRICE$: BehaviorSubject<number> = new BehaviorSubject(25000);
  /**
   * Tỉ giá hiện tại
   */
  DEFAULT_EXCHANGE$: BehaviorSubject<number> = new BehaviorSubject(3600);
  /**
   * Tiền lãi trên 1 đơn hàng; Giá bán = Giá nhâp + LÃI
   */
  INCOME_PER_ORDER$: BehaviorSubject<number> = new BehaviorSubject(35000);

  /** Tiền thuế trên đơn hàng: hiện tại 1,5% => x * (1 + 1.5) */
  VAT$: BehaviorSubject<number> = new BehaviorSubject(101.5 / 100);

  /** Trạng thái selected của status dropdown dùng để binding lên UI và call api */
  DROPDOWN_STATUS_SELECTED$: BehaviorSubject<number[]> = new BehaviorSubject([
    STATUS_DROPDOWN.ORDERED,
    STATUS_DROPDOWN.RECEIVED,
    STATUS_DROPDOWN.DELIVERY,
  ]);

  /** Menu ẩn/hiện */
  IS_SHOW_MENU$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /** Menu mở rộng hoặc thu nhỏ */
  IS_OPEN_MENU$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /** Trạng thái selected của status dropdown dùng để binding lên UI và call api */
  DATABASE_FIREBASE$: BehaviorSubject<number> = new BehaviorSubject(0);

  SETTING_ID$: BehaviorSubject<string> = new BehaviorSubject(
    'ebFogSAiYBRJAVe9vm09'
  );

  constructor(private firestore: Firestore) {
    this.DATABASE_FIREBASE$.subscribe((index) => {
      this.PRODUCTS_COLLECTION = ENVIRONMENT_LIST[index].products;
      this.productsCol = collection(this.firestore, this.PRODUCTS_COLLECTION);
      console.log('Sử dụng DB', this.PRODUCTS_COLLECTION);
    });
    this.settingCol = collection(this.firestore, this.SETTING_COLLECTION);
  }

  fbGetProducts() {
    return this.getCustomDocs(this.productsCol);
  }

  fbQueryProducts(status: STATUS_DROPDOWN[]): Observable<any> {
    const q = query(this.productsCol, where('status', 'in', status));
    return this.getCustomDocs(q).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  fbAddProducts(docData: FacebookProduct): Observable<any> {
    docData.created = Date.now();
    return from(addDoc(this.productsCol, docData)).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  fbUpdateProduct(docData: FacebookProduct, id: string) {
    return from(
      updateDoc(
        doc(this.firestore, this.PRODUCTS_COLLECTION, id),
        docData as any
      )
    ).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  fbUpdateProducts(docData: FacebookProduct, items: any[]) {
    const arr: Observable<any>[] = [];
    items.forEach((item) => {
      const update = from(
        runTransaction(this.firestore, (transaction: Transaction) => {
          const document = doc(
            this.firestore,
            this.PRODUCTS_COLLECTION,
            item._id
          );

          return transaction.get(document).then((sfDoc) => {
            if (!sfDoc.exists) {
              throw 'Document does not exist!';
            }
            transaction.update(document, docData as any);
          });
        })
      );
      arr.push(update);
    });

    return forkJoin(arr).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  // Just update to status deleted
  fbDeleteProduct(id: string) {
    return this.fbUpdateProduct({ status: STATUS_DROPDOWN.DELETED }, id);
  }

  fbDeleteProducts(items: any[]) {
    return this.fbUpdateProducts({ status: STATUS_DROPDOWN.DELETED }, items);
  }

  // Not recommend real delete => Just update to status deleted
  private fbDeleteRealProduct(id: string) {
    return from(
      deleteDoc(doc(this.firestore, this.PRODUCTS_COLLECTION, id))
    ).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  // Not recommend real delete => Just update to status deleted
  private fbDeleteRealProducts(items: any[]) {
    const arr: Observable<any>[] = [];
    items.forEach((item) => {
      const update = from(
        runTransaction(this.firestore, (transaction: Transaction) => {
          const document = doc(
            this.firestore,
            this.PRODUCTS_COLLECTION,
            item._id
          );

          return transaction.get(document).then((sfDoc) => {
            if (!sfDoc.exists) {
              throw 'Document does not exist!';
            }
            transaction.delete(document);
          });
        })
      );
      arr.push(update);
    });

    return forkJoin(arr).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  //SETTING ===================================================
  loadSetting(bindingSetting?: any) {
    this.settingGet().subscribe((res) => {
      if (res?.length > 0) {
        const setting = res[0];
        this.DATABASE_FIREBASE$.next(setting.databaseSource);
        this.SETTING_ID$.next(setting.settingID);
        this.DEFAULT_WEIGHT_PRICE$.next(setting.defaultWeightPrice);
        this.DEFAULT_EXCHANGE$.next(setting.defaultExchange);
        this.INCOME_PER_ORDER$.next(setting.incomePerOrder);
        this.VAT$.next(setting.vat);
        this.DROPDOWN_STATUS_SELECTED$.next(setting.statusSelected);
        this.IS_SHOW_MENU$.next(setting.showMenu);
        this.IS_OPEN_MENU$.next(setting.isOpen);
        if (bindingSetting) {
          bindingSetting();
        }
      }
    });
  }

  settingGet() {
    return this.getCustomDocs(this.settingCol);
  }

  settingAdd(docData: any): Observable<any> {
    docData.created = Date.now();
    return from(addDoc(this.settingCol, docData)).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  settingUpdate(docData: any, id: string) {
    return from(
      updateDoc(doc(this.firestore, this.SETTING_COLLECTION, id), docData)
    ).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }
  // SUPPORT ========================================
  private getCustomDocs(q: Query<DocumentData>): Observable<any> {
    return from(
      getDocs(q).then((item) => {
        return item.docs.map((doc) => {
          return {
            ...doc.data(),
            _id: doc.id,
          };
        });
      })
    );
  }

  private handerErr(err: any) {
    console.log({ err });
    alert('Err' + err.toString());
  }
}
