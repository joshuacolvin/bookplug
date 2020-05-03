import { Observable, of } from 'rxjs';
import { IBook } from './book.types';

export class BooksServiceMock {
  public getBookById(id: number): Observable<IBook> {
    return of({
      id: 'xyz123',
      uid: '123xyz',
      title: 'Book title',
      authors: 'Author Name',
      thumbnailUrl: 'https://www.some-url.com',
      recommendations: [
        {
          source: 'Some source',
          url: 'https://www.some-url.com',
          id: '1234',
          recommendedBy: 'someone',
          uid: '9876',
          notes: '',
          createdAt: '',
        },
      ],
    });
  }
}
