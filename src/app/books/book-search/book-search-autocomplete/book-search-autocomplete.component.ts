import { GoogleBooksApiService } from './../../google-book-api.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IGoogleBook } from '../../book.types';
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-search-autocomplete',
  templateUrl: './book-search-autocomplete.component.html',
  styleUrls: ['./book-search-autocomplete.component.scss'],
})
export class BookSearchAutocompleteComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private googleBooksApiService: GoogleBooksApiService,
    private router: Router
  ) {}

  books$: Observable<IGoogleBook[]>;
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });

    this.books$ = this.form.get('search').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      flatMap((searchTerm: string) =>
        this.googleBooksApiService.searchBooks(searchTerm)
      )
    );
  }

  displayFn(book: IGoogleBook): string {
    if (book) {
      return book.volumeInfo.title;
    }
  }

  onSelect(isbn: string): void {
    this.form.reset();
    this.router.navigateByUrl(`isbn/${isbn}`);
  }
}
