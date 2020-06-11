import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  error: string;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  resetPassword(): void {
    if (this.form.invalid) {
      return;
    }

    const { email } = this.form.value;
    this.authService.resetPassword(email).pipe(untilDestroyed(this)).subscribe(
      () => {
        this.snackBar.open('Reset password email has been sent', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        this.router.navigateByUrl('auth/login');
      },
      (err) => (this.error = err.message)
    );
  }
}
