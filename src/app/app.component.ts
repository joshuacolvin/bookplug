import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  searchFocused = false;
  user$: Observable<firebase.User>;

  ngOnInit(): void {
    this.user$ = this.authService.getAuthState();
  }

  logout(): void {
    this.authService.signOut().pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigateByUrl('auth/login');
      });
  }
}
