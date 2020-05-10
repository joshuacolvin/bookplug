import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { BookDialogComponent } from './../book-dialog/book-dialog.component';
import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';
import { IBook, IRecommendation } from '../book.types';
import { Observable, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

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
    ).subscribe((res: { params: Params; data: Data }) => {
      this.bookId = res.params.id;
      this.book$ = this.booksService.getBookById(this.bookId);
      this.recommendations$ = this.booksService.getAllRecommendationsForBook(
        this.bookId
      );
      this.uid = res.data.user.uid;
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
        message: 'Are you sure you want to remove this recommendation',
      },
    });

    dialogRef.afterClosed().subscribe((remove: boolean) => {
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
}
