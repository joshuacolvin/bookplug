import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  error: string;
  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    this.error = '';
    const { email, password } = this.form.value;

    this.authService.createUserWithEmailAndPassword(email, password).pipe(untilDestroyed(this)).subscribe(
      (res: firebase.auth.UserCredential) => {
        this.router.navigateByUrl('auth/login');
      },
      (err) => (this.error = err.message)
    );
  }
}
