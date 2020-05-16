import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  ) {}

  error: string;
  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    const { email, password } = this.form.value;

    this.authService.createUserWithEmailAndPassword(email, password).subscribe(
      (res: firebase.auth.UserCredential) => {
        this.router.navigateByUrl('auth/login');
      },
      (err) => {
        switch (err.message) {
          case 'auth/email-already-in-use':
            this.error = 'Email is already in use';
            break;
          case 'EMAIL_NOT_FOUND':
            this.error = 'Email not valid';
            break;
          case 'auth/operation-not-allowed':
            this.error = 'Email/password accounts not supported';
            break;
          case 'auth/weak-password':
            this.error = 'Password not strong enough';
            break;
          default:
            this.error = err.message;
        }
      }
    );
  }
}
