import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLikeListComponent } from './activity-like-list.component';

describe('ActivityLikeListComponent', () => {
  let component: ActivityLikeListComponent;
  let fixture: ComponentFixture<ActivityLikeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLikeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
