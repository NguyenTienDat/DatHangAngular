import { FirebaseService as FirebaseService } from '../shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}
}
