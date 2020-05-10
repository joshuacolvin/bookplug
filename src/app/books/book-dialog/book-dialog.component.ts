import { IRecommendation } from './../book.types';
import { BooksService } from './../books.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
})
export class BookDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRecommendation
  ) {}

  @Input() bookId: string;
  @Input() uid: string;

  form: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  addRecommendation() {
    this.booksService
      .addRecommendation(this.bookId, { ...this.form.value, uid: this.uid })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.data ? this.updateRecommendation() : this.addRecommendation();
  }

  updateRecommendation() {
    const { id } = this.form.value;
    this.booksService
      .updateRecommendation(this.bookId, id, {
        ...this.form.value,
        uid: this.uid,
      })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: [this.data ? this.data.id : ''],
      recommendedBy: [this.data ? this.data.recommendedBy : ''],
      url: [this.data ? this.data.url : ''],
      notes: [this.data ? this.data.notes : ''],
    });
  }
}
