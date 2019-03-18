import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMemberListComponent } from './activity-member-list.component';

describe('ActivityMemberListComponent', () => {
  let component: ActivityMemberListComponent;
  let fixture: ComponentFixture<ActivityMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
