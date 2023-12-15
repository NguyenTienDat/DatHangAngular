import { FirebaseService } from './shared/services/firebase.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public firebaseService: FirebaseService) {
    this.firebaseService.loadSetting();
  }
}
