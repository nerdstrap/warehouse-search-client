import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Tokens } from '../models';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.getAccessToken()) {
            request = this.addAuthorizationHeader(request, this.authService.getAccessToken());
        }

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(request, next);
            } else {
                return throwError(error);
            }
        }));
    }

    private addAuthorizationHeader(request: HttpRequest<any>, accessToken: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: Tokens) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.accessToken);
                    return next.handle(this.addAuthorizationHeader(request, token.accessToken.token));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(accessToken => {
                    return next.handle(this.addAuthorizationHeader(request, accessToken));
                }));
        }
    }
}