import { MatDialog } from '@angular/material';
import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../book.types';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
  ) {}

  public book: IBook;
  public bookId: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params.id;
      this.getBookById(this.bookId);
    });
  }

  public openEditModal(): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '50%',
      data: this.book,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getBookById(this.bookId);
      }
    });
  }

  private getBookById(id: string): void {
    this.booksService.getBookById(id).subscribe(
      (book: IBook) => {
        this.book = book;
      },
      err => console.error,
    );
  }
}
