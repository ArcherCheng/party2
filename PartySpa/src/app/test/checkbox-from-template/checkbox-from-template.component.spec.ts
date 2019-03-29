import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFromTemplateComponent } from './checkbox-from-template.component';

describe('CheckboxFromTemplateComponent', () => {
  let component: CheckboxFromTemplateComponent;
  let fixture: ComponentFixture<CheckboxFromTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxFromTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxFromTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
