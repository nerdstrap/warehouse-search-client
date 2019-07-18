import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;

        if (currentUser) {
            if (route.data.roles) {
                if (currentUser.roles) {
                    const found = route.data.roles.some(r => currentUser.roles.indexOf(r) >= 0);
                    if (!found) {
                        this.router.navigate(['/']);
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}