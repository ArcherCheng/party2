import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAfterComponent } from './note-after.component';

describe('NoteAfterComponent', () => {
  let component: NoteAfterComponent;
  let fixture: ComponentFixture<NoteAfterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteAfterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
