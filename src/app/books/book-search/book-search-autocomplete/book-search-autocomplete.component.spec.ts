import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchAutocompleteComponent } from './book-search-autocomplete.component';

describe('BookSearchAutocompleteComponent', () => {
  let component: BookSearchAutocompleteComponent;
  let fixture: ComponentFixture<BookSearchAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSearchAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
