import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFormComponent } from './container/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { CheckboxTemplateComponent } from './components/checkbox-template/checkbox-template.component';
import { CheckboxReactiveComponent } from './components/checkbox-reactive/checkbox-reactive.component';
// import { CheckboxValuePosterService } from './service/checkbox-value-poster.service';

@NgModule({
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormInputComponent,
    FormRadioComponent,
    FormCheckboxComponent,
    FormSelectComponent,
    FormButtonComponent,
    CheckboxTemplateComponent,
    CheckboxReactiveComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    CheckboxTemplateComponent,
    CheckboxReactiveComponent,
  ],
  entryComponents: [
    FormInputComponent,
    FormRadioComponent,
    FormCheckboxComponent,
    FormSelectComponent,
    FormButtonComponent,
    CheckboxTemplateComponent,
    CheckboxReactiveComponent,
  ],
  // providers: [CheckboxValuePosterService]
})
export class DynamicFormModule { }
