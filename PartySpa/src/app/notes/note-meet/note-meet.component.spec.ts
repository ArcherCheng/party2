import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMeetComponent } from './note-meet.component';

describe('NoteMeetComponent', () => {
  let component: NoteMeetComponent;
  let fixture: ComponentFixture<NoteMeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteMeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
