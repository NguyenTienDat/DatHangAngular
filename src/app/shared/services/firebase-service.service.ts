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
} from '@angular/fire/firestore';
import { Observable, from, BehaviorSubject, catchError } from 'rxjs';
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

  constructor(private firestore: Firestore) {
    this.productsCol = collection(this.firestore, this.PRODUCTS_COLLECTION);
  }

  fbGetProducts() {
    return this.getCustomDocs(this.productsCol);
  }

  fbQueryProducts(): Observable<any> {
    const q = query(
      this.productsCol,
      where('status', '!=', STATUS_DROPDOWN.DONE)
    );
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

  // export async function fbUpdateProducts(docData, id) {
  //   await updateDoc(doc(dbFirebase, "products", id), docData);
  // }

  fbDeleteProducts(id: string) {
    return from(
      deleteDoc(doc(this.firestore, this.PRODUCTS_COLLECTION, id))
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
