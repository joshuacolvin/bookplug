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
    return of(this.auth.afAuth).pipe(
      take(1),
      map((authState: AngularFireAuth) => !!authState),
      tap((authenticated: boolean) => {
        if (!authenticated) {
          this.router.navigate(['login']);
        } else {
          return of(authenticated);
        }
      })
    );
  }
}
