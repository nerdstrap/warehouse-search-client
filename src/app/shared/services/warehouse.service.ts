import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { BaseService } from "./base.service";
import { Item } from '../models';

@Injectable({ providedIn: 'root' })
export class WarehouseService extends BaseService {

  baseApiUrl: string = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseApiUrl = configService.getApiUri();
  }

  getItems() {
    return this.http.get<any>(`${this.baseApiUrl}/warehouse/items`)
      .pipe(map(data => data.value));
  }
}
