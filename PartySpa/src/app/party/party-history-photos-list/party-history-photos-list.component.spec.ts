import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHistoryPhotosListComponent } from './party-history-photos-list.component';

describe('PartyHistoryPhotosListComponent', () => {
  let component: PartyHistoryPhotosListComponent;
  let fixture: ComponentFixture<PartyHistoryPhotosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyHistoryPhotosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyHistoryPhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
