import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.authService.showLogin();
  }
}
