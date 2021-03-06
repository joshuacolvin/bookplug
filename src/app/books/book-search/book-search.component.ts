import { GoogleBooksApiService } from './../google-book-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IGoogleBook } from '../book.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private googleBooksApiService: GoogleBooksApiService,
    private router: Router
  ) {}

  form: FormGroup;
  books$: Observable<IGoogleBook[]>;

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });

    this.onChanges();
  }

  onChanges(): void {
    this.books$ = this.form.get('search').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      flatMap((searchTerm: string) =>
        this.googleBooksApiService.searchBooks(searchTerm)
      )
    );
  }

  onSelect(isbn: string): void {
    this.router.navigateByUrl(`isbn/${isbn}`);
  }
}
