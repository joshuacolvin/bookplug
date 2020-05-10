import { BooksService } from './../books.service';
import { IGoogleBook, IBook } from './../book.types';
import { GoogleBooksApiService } from './../google-book-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss'],
})
export class BookPreviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private googleBooksApiService: GoogleBooksApiService
  ) {}

  book$: Observable<IGoogleBook>;
  uid: string;

  ngOnInit(): void {
    combineLatest(this.route.params, this.route.data, (params, data) => ({
      params,
      data,
    })).subscribe((res: { params: Params; data: Data }) => {
      const { isbn } = res.params;
      this.uid = res.data.user.uid;
      this.getBookByIsbn(isbn);
    });
  }

  addBook(book: IGoogleBook): void {
    const {
      authors,
      categories,
      industryIdentifiers,
      imageLinks,
      pageCount,
      publishedDate,
      publisher,
      subtitle,
      title,
    } = book.volumeInfo;

    const bookToAdd: Partial<IBook> = {
      authors: authors.toString(),
      categories: categories.toString(),
      isbn: industryIdentifiers[0].identifier,
      thumbnail: imageLinks.thumbnail,
      pageCount,
      publishedDate,
      publisher,
      subtitle: subtitle || '',
      title,
      uid: this.uid,
    };

    this.bookService.addBook(bookToAdd).subscribe((book: IBook) => {
      this.router.navigateByUrl(`books/${book.id}`);
    });
  }

  private getBookByIsbn(isbn: string): void {
    this.book$ = this.googleBooksApiService.getBookByIsbn(isbn);
  }
}
