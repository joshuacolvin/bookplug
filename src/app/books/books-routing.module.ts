import { AuthResolver } from './../auth/auth.resolver';
import { BookSearchComponent } from './book-search/book-search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/login']);

const routes: Routes = [
  {
    path: 'books',
    component: BookListComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: { user: AuthResolver },
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: { user: AuthResolver },
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'isbn/:isbn',
    component: BookPreviewComponent,
    canActivate: [AngularFireAuthGuard],
    resolve: { user: AuthResolver },
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'search',
    component: BookSearchComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class BooksRoutingModule { }
