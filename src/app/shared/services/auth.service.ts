import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { ConfigService } from '../utils';
import { Tokens, User } from '../models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {

    baseApiUrl = '';
    private readonly ACCESS_TOKEN = 'accessToken';
    private readonly REFRESH_TOKEN = 'refreshToken';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
        this.baseApiUrl = configService.getApiUri();
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    register(user: { firstName: string, lastName: string, email: string, userName: string, password: string }): Observable<boolean> {
        return this.http.post<any>(`${this.baseApiUrl}/accounts`, user)
            .pipe(
                tap(currentUser => this.doLoginUser(currentUser)),
                mapTo(true),
                catchError(error => {
                    alert(error.error);
                    return of(false);
                }));
    }

    login(user: { userName: string, password: string }): Observable<boolean> {
        return this.http.post<any>(`${this.baseApiUrl}/auth/login`, user)
            .pipe(
                tap(currentUser => this.doLoginUser(currentUser)),
                mapTo(true),
                catchError(error => {
                    alert(error.error);
                    return of(false);
                }));
    }

    refreshToken() {
        return this.http.post<any>(`${this.baseApiUrl}/auth/refreshToken`, {
            refreshToken: this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
            this.storeAccessToken(tokens.accessToken.token);
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.removeTokens();
        this.currentUserSubject.next(null);
    }

    isLoggedIn() {
        return !!this.getAccessToken();
    }

    private isInRole(role: string) : boolean {
        return this.currentUserValue && this.currentUserValue.roles && this.currentUserValue.roles.indexOf(role) >= 0;
    }

    get isAdmin() : boolean {
        return this.isInRole('admin');
      }

    getAccessToken() {
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    private doLoginUser(currentUser: User) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.storeTokens(currentUser);
        this.currentUserSubject.next(currentUser);
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeAccessToken(accessToken: string) {
        localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    }

    private storeTokens(currentUser: User) {
        localStorage.setItem(this.ACCESS_TOKEN, currentUser.accessToken.token);
        localStorage.setItem(this.REFRESH_TOKEN, currentUser.refreshToken.token);
    }

    private removeTokens() {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
    }
}