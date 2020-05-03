import { GoogleBooksApiService } from './../google-book-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private googleBooksApiService: GoogleBooksApiService
  ) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });

    this.onChanges();
  }

  onChanges(): void {
    this.form
      .get('search')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        flatMap((searchTerm: string) =>
          this.googleBooksApiService.searchBooks(searchTerm)
        )
      )
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
