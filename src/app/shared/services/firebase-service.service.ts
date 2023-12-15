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
import { FacebookProduct, STATUS_DROPDOWN } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  private readonly PRODUCTS_COLLECTION = 'products';
  private productsCol: CollectionReference;
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

  constructor(private firestore: Firestore) {
    this.productsCol = collection(this.firestore, this.PRODUCTS_COLLECTION);
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

  fbUpdateProduct(docData: any, id: string) {
    return from(
      updateDoc(doc(this.firestore, this.PRODUCTS_COLLECTION, id), docData)
    ).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  fbUpdateProducts(docData: any, items: any[]) {
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
            transaction.update(document, docData);
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

  fbDeleteProduct(id: string) {
    return from(
      deleteDoc(doc(this.firestore, this.PRODUCTS_COLLECTION, id))
    ).pipe(
      catchError((err, caught) => {
        this.handerErr(err);
        return caught;
      })
    );
  }

  fbDeleteProducts(items: any[]) {
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
