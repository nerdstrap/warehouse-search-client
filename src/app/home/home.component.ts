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
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.currentUser = this.authService.currentUserValue;
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit() {
  }

}
