import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLoggedIn = this.auth.isLoggedIn();
    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      return this.router.parseUrl('/login');
    }
    return true;
  }
}