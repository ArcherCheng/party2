import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDynamicFormComponent } from './test-dynamic-form.component';

describe('TestDynamicFormComponent', () => {
  let component: TestDynamicFormComponent;
  let fixture: ComponentFixture<TestDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
