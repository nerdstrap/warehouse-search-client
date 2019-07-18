import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService, UserService } from '../shared/services';
import { User } from '../shared/models';
import { Observable } from 'rxjs';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  title = 'Home';
  loading = false;
  currentUser: User;
  userFromApi: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.userService.getMe().pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });
  }

}
