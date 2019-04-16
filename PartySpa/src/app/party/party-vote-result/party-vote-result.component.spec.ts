import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyVoteResultComponent } from './party-vote-result.component';

describe('PartyVoteResultComponent', () => {
  let component: PartyVoteResultComponent;
  let fixture: ComponentFixture<PartyVoteResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyVoteResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyVoteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
