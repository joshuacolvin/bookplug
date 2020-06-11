import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  form: FormGroup;
  error: string;

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  forgotPassword(event) {
    event.preventDefault();

    this.router.navigateByUrl('auth/forgot-password');
  }

  login(): void {
    const { email, password } = this.form.value;

    this.authService.signInWithEmailAndPassword(email, password).pipe(untilDestroyed(this)).subscribe(
      (res: firebase.auth.UserCredential) => {
        this.router.navigateByUrl('books');
      },
      (err) => (this.error = err.message)
    );
  }
}
