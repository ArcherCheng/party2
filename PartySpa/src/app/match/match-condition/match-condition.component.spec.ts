import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchConditionComponent } from './match-condition.component';

describe('MatchConditionComponent', () => {
  let component: MatchConditionComponent;
  let fixture: ComponentFixture<MatchConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
