import { MatDialog } from '@angular/material';
import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { IBook } from '../book.types';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  public books: IBook[];
  public displayedColumns: string[] = [
    'title',
    'author',
    'recommendations',
    'details',
  ];

  ngOnInit() {
    this.getAllBooks();
  }

  public openEditModal(): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllBooks();
    });
  }

  private getAllBooks() {
    this.booksService.getAllBooks().subscribe(
      (books: IBook[]) => {
        this.books = books;
      },
      err => console.error,
    );
  }
}
