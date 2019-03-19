import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPhotoListComponent } from './party-photo-list.component';

describe('PartyPhotoListComponent', () => {
  let component: PartyPhotoListComponent;
  let fixture: ComponentFixture<PartyPhotoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyPhotoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyPhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
