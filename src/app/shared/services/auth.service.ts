import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { ConfigService } from '../utils';
import { Tokens } from '../models';
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {

    baseApiUrl: string = '';
    private readonly ACCESS_TOKEN = 'accessToken';
    private readonly REFRESH_TOKEN = 'refreshToken';
    private currentUser: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
        this.baseApiUrl = configService.getApiUri();
    }

    register(user: { firstName: string, lastName: string, email: string, userName: string, password: string }): Observable<boolean> {
        return this.http.post<any>(`${this.baseApiUrl}/accounts`, user)
            .pipe(
                tap(tokens => this.doLoginUser(user.userName, tokens)),
                mapTo(true),
                catchError(error => {
                    alert(error.error);
                    return of(false);
                }));
    }

    login(user: { userName: string, password: string }): Observable<boolean> {
        return this.http.post<any>(`${this.baseApiUrl}/auth/login`, user)
            .pipe(
                tap(tokens => this.doLoginUser(user.userName, tokens)),
                mapTo(true),
                catchError(error => {
                    alert(error.error);
                    return of(false);
                }));
    }

    refreshToken() {
        return this.http.post<any>(`${this.baseApiUrl}/auth/refreshToken`, {
            'refreshToken': this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
            this.storeAccessToken(tokens.accessToken);
        }));
    }

    logout() {
        return this.http.post<any>(`${this.baseApiUrl}/auth/logout`, {
            'refreshToken': this.getRefreshToken()
        }).pipe(
            tap(() => this.doLogoutUser()),
            mapTo(true),
            catchError(error => {
                alert(error.error);
                return of(false);
            }));
    }

    isLoggedIn() {
        return !!this.getAccessToken();
    }

    getAccessToken() {
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    private doLoginUser(userName: string, tokens: Tokens) {
        this.currentUser = userName;
        this.storeTokens(tokens);
    }

    private doLogoutUser() {
        this.currentUser = null;
        this.removeTokens();
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeAccessToken(accessToken: string) {
        localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    }

    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }

    private removeTokens() {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
    }
}