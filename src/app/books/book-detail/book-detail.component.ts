import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { BookDialogComponent } from './../book-dialog/book-dialog.component';
import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { IBook, IRecommendation } from '../book.types';
import { Observable, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  book$: Observable<IBook>;
  bookId: string;
  displayedColumns: string[] = ['recommendedBy', 'url', 'notes', 'actions'];
  recommendations$: Observable<IRecommendation[]>;
  uid: string;

  ngOnInit() {
    combineLatest(
      this.route.params,
      this.route.data,
      (params: Params, data: Data) => ({
        params,
        data,
      })
    ).pipe(untilDestroyed(this)).subscribe((res: { params: Params; data: Data }) => {
      const { params, data } = res;

      this.bookId = params.id;
      this.book$ = this.booksService.getBookById(this.bookId);
      this.recommendations$ = this.booksService.getAllRecommendationsForBook(
        this.bookId
      );
      this.uid = data.user.uid;
    });
  }

  addRecommendation() {
    this.openDialog();
  }

  editRecommendation(recommendation: IRecommendation) {
    this.openDialog(recommendation);
  }

  removeRecommendation(recommendationId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Recommendation',
        message: 'Are you sure you want to remove this recommendation?',
      },
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe((remove: boolean) => {
      if (remove) {
        this.booksService.removeRecommendation(this.bookId, recommendationId);
      }
    });
  }

  openDialog(recommendation?: IRecommendation) {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      data: recommendation,
    });

    dialogRef.componentInstance.bookId = this.bookId;
    dialogRef.componentInstance.uid = this.uid;
  }

  onDeleteBook() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Book',
        message: 'Are you sure you want to remove this book?',
      },
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe((remove: boolean) => {
      if (remove) {
        this.booksService.deleteBook(this.bookId).then(() => this.router.navigateByUrl('books'))
      }
    });
  }
}
