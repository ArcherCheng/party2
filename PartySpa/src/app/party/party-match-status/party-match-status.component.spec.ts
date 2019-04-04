import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMatchStatusComponent } from './party-match-status.component';

describe('PartyMatchStatusComponent', () => {
  let component: PartyMatchStatusComponent;
  let fixture: ComponentFixture<PartyMatchStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyMatchStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMatchStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
