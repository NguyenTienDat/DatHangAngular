import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ConfirmationService } from 'primeng/api';
import { DecimalPipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';

const firebaseConfig = {
  apiKey: 'AIzaSyAmWtEdw-4PjzdDXkYFKEyxz1S2L38vZ1o',
  authDomain: 'dathangjs.firebaseapp.com',
  projectId: 'dathangjs',
  storageBucket: 'dathangjs.appspot.com',
  messagingSenderId: '118350461604',
  appId: '1:118350461604:web:522c2624e4248f51bc0431',
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyCLAwZp9yA6nO8T9_zrnVcuLwjfaPNhfLA',
//   authDomain: 'dathangangular.firebaseapp.com',
//   projectId: 'dathangangular',
//   storageBucket: 'dathangangular.appspot.com',
//   messagingSenderId: '734578423279',
//   appId: '1:734578423279:web:9b39751e9fef168f6ef21a',
//   measurementId: 'G-V049MJKQBG',
// };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    SharedModule,
    HttpClientModule,
    // https://github.com/angular/angularfire/blob/master/docs/version-7-upgrade.md
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [ConfirmationService, DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
