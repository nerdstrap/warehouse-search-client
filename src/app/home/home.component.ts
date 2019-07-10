import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  title: string = 'Home';

  ngOnInit() {
  }

  onAddDocument() { }

}
