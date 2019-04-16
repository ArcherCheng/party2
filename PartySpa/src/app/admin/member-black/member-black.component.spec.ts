import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBlackComponent } from './member-black.component';

describe('MemberBlackComponent', () => {
  let component: MemberBlackComponent;
  let fixture: ComponentFixture<MemberBlackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBlackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
