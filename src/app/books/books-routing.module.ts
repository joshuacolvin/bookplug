import { AuthResolver } from './../auth/auth.resolver';
import { BookSearchComponent } from './book-search/book-search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    canActivate: [AuthGuard],
    resolve: { user: AuthResolver },
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
    canActivate: [AuthGuard],
    resolve: { user: AuthResolver },
  },
  {
    path: 'isbn/:isbn',
    component: BookPreviewComponent,
    canActivate: [AuthGuard],
    resolve: { user: AuthResolver },
  },
  { path: 'search', component: BookSearchComponent, canActivate: [AuthGuard] },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class BooksRoutingModule {}
