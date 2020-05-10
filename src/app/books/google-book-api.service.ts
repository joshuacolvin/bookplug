import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IGoogleBook } from './book.types';

@Injectable({ providedIn: 'root' })
export class GoogleBooksApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  searchBooks(search: string): Observable<IGoogleBook[]> {
    const encodedURI = encodeURI(`${this.baseUrl}?q=${search}&maxResults=12`);
    return this.http.get(encodedURI).pipe(map((res: any) => res.items));
  }

  getBookByIsbn(isbn: string): Observable<IGoogleBook> {
    const encodedURI = encodeURI(`${this.baseUrl}?q=isbn:${isbn}&maxResults=1`);
    return this.http
      .get(encodedURI)
      .pipe(map((res: any) => (res.items ? res.items[0] : {})));
  }
}
