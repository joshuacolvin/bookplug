import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GoogleBooksApiService {
  constructor(private http: HttpClient) {}

  searchBooks(search: string): Observable<any> {
    const encodedURI = encodeURI(
      `https://www.googleapis.com/books/v1/volumes?q=${search}
        &maxResults=12`
    );
    return this.http.get(encodedURI);
  }
}
