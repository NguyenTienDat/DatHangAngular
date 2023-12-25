import { AuthService } from './shared/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';
import { Component } from '@angular/core';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoginPage = true;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private authService: AuthService
  ) {
    this.firebaseService.loadSetting();

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.isLoginPage = res.urlAfterRedirects === '/login';
      });

    this.authService.getUser();
  }
}
