import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPayEditComponent } from './member-pay-edit.component';

describe('MemberPayEditComponent', () => {
  let component: MemberPayEditComponent;
  let fixture: ComponentFixture<MemberPayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
