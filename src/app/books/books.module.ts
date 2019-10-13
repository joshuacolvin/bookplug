import { BooksRoutingModule } from './books-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from '../books/book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { MaterialModule } from '../material.module';
import { BookModalComponent } from './book-modal/book-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookDetailComponent, BookListComponent, BookModalComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [BookModalComponent],
})
export class BooksModule {}
