import { Observable, of } from 'rxjs';
import { IBook } from './book.types';

export class BooksServiceMock {
  public getBookById(id: number): Observable<IBook> {
    return of({
      id: 'xyz123',
      title: 'Book title',
      author: 'Author Name',
      recommendations: [
        {
          source: 'Some source',
          url: 'https://www.some-url.com',
        },
      ],
    });
  }
}
