import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToBooks = () => redirectLoggedInTo(['books']);
const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { authDataPip: redirectLoggedInToBooks } },
  { path: 'register', component: RegisterComponent, data: { authDataPip: redirectLoggedInToBooks } },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule { }
