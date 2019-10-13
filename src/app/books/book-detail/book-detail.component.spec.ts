import { BooksServiceMock } from './../books.service.mock';
import { BooksService } from './../books.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MatDialogMock {}

fdescribe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      providers: [
        { provide: BooksService, useClass: BooksServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 2,
            }),
          },
        },
      ],
    }).overrideComponent(BookDetailComponent, {
      set: {
        template: '',
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
