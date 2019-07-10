import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';

import { WarehouseService } from '../shared/services';
import { Item } from '../shared/models';

@Component({ templateUrl: 'warehouse-search.component.html' })
export class WarehouseSearchComponent implements OnInit {
  items: Item[];
  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['number', 'type', 'status', 'units'];
  loading: boolean = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private warehouseService: WarehouseService) { }

  title: string = 'Warehouse Search';

  ngOnInit() {

      this.warehouseService.getItems()
        .subscribe(getItemsResponse => {
          this.items = getItemsResponse;
          this.dataSource.data = this.items as Item[];
        });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getTotalUnits() {
    if (this.items && this.items.length) {
      return this.items.reduce((accumulator, item) => accumulator + item.units, 0);
    } else {
      return 0;
    }
  }

  onAddItem() { }

}
