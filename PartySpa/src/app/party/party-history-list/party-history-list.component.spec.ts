import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHistoryListComponent } from './party-history-list.component';

describe('PartyHistoryListComponent', () => {
  let component: PartyHistoryListComponent;
  let fixture: ComponentFixture<PartyHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
