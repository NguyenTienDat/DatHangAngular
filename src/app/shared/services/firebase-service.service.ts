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
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  private readonly PRODUCTS_COLLECTION = 'products';
  private productsCol: CollectionReference;
  constructor(private firestore: Firestore) {
    this.productsCol = collection(this.firestore, 'products');
  }

  getFacebook() {
    const docc = doc(this.firestore, 'products');
    console.log({ docc });
    // const productList = citySnapshot.docs.map((doc) => {
    //   return {
    //     ...doc.data(),
    //     _id: doc.id,
    //   };
    // });
    // return from(productList);
    return docSnapshots(docc);
  }

  fbGetProducts() {
    return this.getCustomDocs(this.productsCol);
  }

  fbQueryProducts(): Observable<any> {
    const q = query(this.productsCol, where('status', '!=', 3));
    return this.getCustomDocs(q);
  }

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
}
