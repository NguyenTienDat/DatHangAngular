import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedModule } from './shared/shared.module';
import { FacebookModule } from './facebook/facebook.module';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ConfirmationService } from 'primeng/api';

const firebaseConfig = {
  apiKey: 'AIzaSyAmWtEdw-4PjzdDXkYFKEyxz1S2L38vZ1o',
  authDomain: 'dathangjs.firebaseapp.com',
  projectId: 'dathangjs',
  storageBucket: 'dathangjs.appspot.com',
  messagingSenderId: '118350461604',
  appId: '1:118350461604:web:522c2624e4248f51bc0431',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    SharedModule,
    FacebookModule,
    HttpClientModule,
    // https://github.com/angular/angularfire/blob/master/docs/version-7-upgrade.md
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
