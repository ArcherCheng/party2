import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActicityAuditComponent } from './acticity-audit.component';

describe('ActicityAuditComponent', () => {
  let component: ActicityAuditComponent;
  let fixture: ComponentFixture<ActicityAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActicityAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActicityAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
