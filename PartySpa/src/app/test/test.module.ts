import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { CheckboxFromReactiveComponent } from './checkbox-from-reactive/checkbox-from-reactive.component';
import { CheckboxFromTemplateComponent } from './checkbox-from-template/checkbox-from-template.component';
import { DynamicFromComponent } from './dynamic-from/dynamic-from.component';
import { DynamicFormModule } from '../_shared/dynamic-form/dynamic-form.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CheckboxFromReactiveComponent,
    CheckboxFromTemplateComponent,
    DynamicFromComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    DynamicFormModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class TestModule { }
