import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyActivityListComponent } from './party-activity-list.component';

describe('PartyActivityListComponent', () => {
  let component: PartyActivityListComponent;
  let fixture: ComponentFixture<PartyActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
