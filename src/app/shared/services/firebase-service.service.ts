import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  private readonly PRODUCTS_COLLECTION = 'products';
  constructor(private firestore: Firestore) {}

  getFacebook(): Observable<any> {
    const itemCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
    return collectionData(itemCollection);
  }
}
