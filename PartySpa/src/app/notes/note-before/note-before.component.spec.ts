import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBeforeComponent } from './note-before.component';

describe('NoteBeforeComponent', () => {
  let component: NoteBeforeComponent;
  let fixture: ComponentFixture<NoteBeforeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteBeforeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
