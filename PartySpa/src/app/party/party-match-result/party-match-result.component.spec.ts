import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMatchResultComponent } from './party-match-result.component';

describe('PartyMatchResultComponent', () => {
  let component: PartyMatchResultComponent;
  let fixture: ComponentFixture<PartyMatchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyMatchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMatchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
