import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberConditionComponent } from './member-condition.component';

describe('MemberConditionComponent', () => {
  let component: MemberConditionComponent;
  let fixture: ComponentFixture<MemberConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
