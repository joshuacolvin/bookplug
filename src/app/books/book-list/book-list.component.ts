import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BooksService } from './../books.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IBook } from '../book.types';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public books: MatTableDataSource<IBook>;
  public displayedColumns: string[] = [
    'thumbnail',
    'title',
    'authors',
    'recommendations',
    'details',
  ];
  public form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      filter: '',
    });

    this.getAllBooks();
  }

  public applyFilter(filterValue: string) {
    this.books.filter = filterValue.trim().toLowerCase();
  }

  public clearFilter(): void {
    this.form.get('filter').patchValue('');
    this.applyFilter('');
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
    this.booksService.getAllBooks('wa6fdYMTBKRkfIgFzPdnmImjy113').subscribe(
      (books: IBook[]) => {
        this.books = new MatTableDataSource(books);
        this.books.sort = this.sort;
      },
      (err) => console.error
    );
  }
}
