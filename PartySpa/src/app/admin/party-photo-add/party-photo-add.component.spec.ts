import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPhotoAddComponent } from './party-photo-add.component';

describe('PartyPhotoAddComponent', () => {
  let component: PartyPhotoAddComponent;
  let fixture: ComponentFixture<PartyPhotoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyPhotoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyPhotoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
