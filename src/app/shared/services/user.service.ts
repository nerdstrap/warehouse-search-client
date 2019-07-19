import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { BaseService } from './base.service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {

  baseApiUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseApiUrl = configService.getApiUri();
  }

  getMe(id: string) {
    return this.http.get<any>(`${this.baseApiUrl}/user/${id}`)
      .pipe(map(data => data.value));
  }
}
