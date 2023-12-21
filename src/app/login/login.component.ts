import { Component, OnInit, AfterViewInit } from '@angular/core';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  ui!: firebaseui.auth.AuthUI;
  constructor() {}

  ngOnInit() {
    this.ui = new firebaseui.auth.AuthUI(getAuth());
  }

  ngAfterViewInit(): void {
    this.ui.start('#firebaseui-auth-container', {
      signInOptions: [EmailAuthProvider.PROVIDER_ID],
      // Other config options...
      signInSuccessUrl: '/pages',
    });
  }
}
