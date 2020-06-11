import { Observable } from 'rxjs';
import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { IBook } from '../book.types';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  books$: Observable<IBook[]>;
  uid: string;

  ngOnInit(): void {
    this.route.data.pipe(untilDestroyed(this))
      .subscribe((data: Data) => {
        this.uid = data.user.uid;
        this.books$ = this.booksService.getAllBooks(this.uid);
      });
  }

  onSelect(book: IBook): void {
    this.router.navigate(['books', book.id]);
  }
}
