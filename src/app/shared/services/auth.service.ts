import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  getAuth,
  EmailAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  firebaseUI = new firebaseui.auth.AuthUI(this.auth);
  CURRENT_USER: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  showLogin() {
    setTimeout(() => {
      this.firebaseUI.start('#firebaseui-auth-container', {
        signInOptions: [EmailAuthProvider.PROVIDER_ID],
        // Other config options...
        // signInSuccessUrl: '/pages',
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: () => {
            this.router.navigate(['pages']);
            return true;
          },
        },
      });
    }, 500);
  }

  goLoginPage() {
    this.router.navigate(['login']);
  }

  getUser() {
    onAuthStateChanged(this.auth, (user) => {
      this.CURRENT_USER.next(user);
      if (user) {
      } else {
        this.goLoginPage();
      }
    });
  }

  logout() {
    this.auth.signOut().then((res) => {
      this.CURRENT_USER.next(null);
    });
  }
}
