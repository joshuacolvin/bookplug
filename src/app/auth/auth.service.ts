import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  private _user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: firebase.User) => {
      this.user = user;
    });
  }

  get user(): firebase.User {
    return this._user;
  }

  set user(value: firebase.User) {
    this._user = value;
  }

  get authenticated(): boolean {
    return !!this._user;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : '';
  }

  public getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  public signInWithPopup(
    provider: firebase.auth.AuthProvider
  ): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.signInWithPopup(provider));
  }

  public signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

  public resetPassword(email: string): Observable<void> {
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }
}
