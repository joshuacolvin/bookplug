import { IBook } from './book.types';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private db: AngularFirestore) {}

  public addBook(book: IBook): Observable<IBook> {
    const booksCollection = this.db.collection<IBook>('books');
    const id = this.db.createId();
    const bookToAdd: IBook = { id, ...book };

    booksCollection.doc(id).set(bookToAdd);

    return this.db.doc<IBook>(`books/${id}`).valueChanges();
  }

  public deleteBook(id: string): Observable<void> {
    return from(this.db.doc<IBook>(`books/${id}`).delete());
  }

  public getAllBooks(): Observable<IBook[]> {
    return this.db.collection<IBook>('books').valueChanges();
  }

  public getBookById(id: string): Observable<IBook> {
    return this.db.doc<IBook>(`books/${id}`).valueChanges();
  }

  public updateBook(id: string, book: IBook): Observable<IBook> {
    this.db.doc<IBook>(`books/${id}`).update(book);

    return this.db.doc<IBook>(`books/${id}`).valueChanges();
  }
}
