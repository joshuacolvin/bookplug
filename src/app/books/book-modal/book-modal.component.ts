import { BooksService } from './../books.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IBook, IRecommendation } from '../book.types';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})
export class BookModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: IBook,
  ) {}

  public form: FormGroup;
  public modalTitle: string;

  get recommendations(): FormArray {
    return this.form.get('recommendations') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data ? this.data.title : '', Validators.required],
      author: [this.data ? this.data.author : '', Validators.required],
      recommendations:
        this.data && this.data.recommendations
          ? this.getRecommendations(this.data.recommendations)
          : this.fb.array([this.initializeRecommendation()]),
    });

    this.modalTitle = this.data ? 'Edit Book' : 'Add Book';
  }

  public addRecommendation(): void {
    this.recommendations.push(this.initializeRecommendation());
  }

  public deleteBook(): void {
    this.booksService.deleteBook(this.data.id).subscribe(() => {
      this.snackBar.open('Book deleted', '', { duration: 2000 });
      this.router.navigate(['books']);
      this.dialogRef.close(false);
    });
  }

  public getRecommendations(recommendations: IRecommendation[]): FormArray {
    const result = recommendations.map((recommendation: IRecommendation) => {
      return this.fb.group({
        source: [recommendation.source, Validators.required],
        url: recommendation.url,
      });
    });

    return this.fb.array(result);
  }

  public initializeRecommendation(): FormGroup {
    return this.fb.group({
      source: ['', Validators.required],
      url: [''],
    });
  }

  public removeRecommendation(index: number): void {
    this.recommendations.removeAt(index);
  }

  public saveBook(): void {
    if (this.data) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  private addBook(): void {
    console.log('adding');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.booksService.addBook(this.form.value).subscribe((book: IBook) => {
      this.snackBar.open(`${book.title} added`, '', { duration: 2000 });
      this.dialogRef.close(true);
    });
  }

  private updateBook(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.booksService
      .updateBook(this.data.id, this.form.value)
      .subscribe((book: IBook) => {
        this.snackBar.open(`${book.title} updated`, '', { duration: 2000 });
        this.dialogRef.close(true);
      });
  }
}
