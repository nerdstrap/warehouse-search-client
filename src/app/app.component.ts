import { Component } from '@angular/core';
import { User } from './shared/models';
import { AuthService } from './shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'warehouse-search-client';
  currentUser: User;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles.findIndex(x => x === 'admin') > -1;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
