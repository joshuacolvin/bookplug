import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return of(this.auth.authenticated).pipe(
      take(1),
      tap((authenticated: boolean) => {
        console.log('authenticated', authenticated);
        if (!authenticated) {
          this.router.navigate(['auth/login']);
        } else {
          return of(authenticated);
        }
      })
    );
  }
}
