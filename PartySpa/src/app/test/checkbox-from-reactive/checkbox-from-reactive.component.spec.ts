import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFromReactiveComponent } from './checkbox-from-reactive.component';

describe('CheckboxFromReactiveComponent', () => {
  let component: CheckboxFromReactiveComponent;
  let fixture: ComponentFixture<CheckboxFromReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxFromReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxFromReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
