import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFromComponent } from './dynamic-from.component';

describe('DynamicFromComponent', () => {
  let component: DynamicFromComponent;
  let fixture: ComponentFixture<DynamicFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
