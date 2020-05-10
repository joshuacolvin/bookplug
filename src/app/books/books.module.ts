import { SharedModule } from './../shared/shared.module';
import { GoogleBooksApiService } from './google-book-api.service';
import { BooksRoutingModule } from './books-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from '../books/book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookSearchComponent } from './book-search/book-search.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { BookSearchAutocompleteComponent } from './book-search/book-search-autocomplete/book-search-autocomplete.component';
import { BookDialogComponent } from './book-dialog/book-dialog.component';

@NgModule({
  declarations: [
    BookDetailComponent,
    BookListComponent,
    BookSearchComponent,
    BookPreviewComponent,
    BookSearchAutocompleteComponent,
    BookDialogComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
  ],
  exports: [BookSearchAutocompleteComponent],
  providers: [GoogleBooksApiService],
})
export class BooksModule {}
