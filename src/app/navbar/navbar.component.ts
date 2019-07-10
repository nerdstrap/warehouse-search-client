import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services';

@Component({
  templateUrl: 'navbar.component.html',
  selector: 'app-navbar'
})
export class NavbarComponent implements OnInit {

  status: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    // this.subscription = this.authenticationService.authNavStatus$.subscribe(status => this.status = status);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

}
