import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMatchListComponent } from './member-match-list.component';

describe('MemberMatchListComponent', () => {
  let component: MemberMatchListComponent;
  let fixture: ComponentFixture<MemberMatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
