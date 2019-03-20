import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPartyListComponent } from './member-party-list.component';

describe('MemberPartyListComponent', () => {
  let component: MemberPartyListComponent;
  let fixture: ComponentFixture<MemberPartyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPartyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPartyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
