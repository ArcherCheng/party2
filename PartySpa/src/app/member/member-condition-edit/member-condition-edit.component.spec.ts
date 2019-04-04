import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberConditionEditComponent } from './member-condition-edit.component';

describe('MemberConditionEditComponent', () => {
  let component: MemberConditionEditComponent;
  let fixture: ComponentFixture<MemberConditionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberConditionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberConditionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
