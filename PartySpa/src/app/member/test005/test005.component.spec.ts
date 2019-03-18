import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Test005Component } from './test005.component';

describe('Test005Component', () => {
  let component: Test005Component;
  let fixture: ComponentFixture<Test005Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test005Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
