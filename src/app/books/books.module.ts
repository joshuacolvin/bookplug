import { GoogleBooksApiService } from './google-book-api.service';
import { BooksRoutingModule } from './books-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from '../books/book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { MaterialModule } from '../material.module';
import { BookModalComponent } from './book-modal/book-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookSearchComponent } from './book-search/book-search.component';

@NgModule({
  declarations: [BookDetailComponent, BookListComponent, BookModalComponent, BookSearchComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [GoogleBooksApiService],
})
export class BooksModule {}
