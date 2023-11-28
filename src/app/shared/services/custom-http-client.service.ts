import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpClientService {
  private _facebookURL = 'assets/facebook.json';

  constructor(private http: HttpClient) {}

  public getFacebookJSON(): Observable<any> {
    return this.http.get(this._facebookURL);
  }
}
