import { Directive, Input, Type, ComponentRef, ComponentFactoryResolver, ViewContainerRef, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../../interface/field-config';
import { Field } from '../../interface/field';

import { CheckboxValuePosterService } from '../../service/checkbox-value-poster.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormButtonComponent } from '../form-button/form-button.component';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormRadioComponent } from '../form-radio/form-radio.component';
import { FormCheckboxComponent } from '../form-checkbox/form-checkbox.component';

const components: { [type: string]: Type<Field> } = {
  input: FormInputComponent,
  button: FormButtonComponent,
  select: FormSelectComponent,
  radio: FormRadioComponent,
  checkbox: FormCheckboxComponent
};

@Directive({
  selector: '[appDynamicField][config][group]'
})
export class DynamicFieldDirective implements OnChanges, OnInit {
  @Input()
  config: FieldConfig;
  @Input()
  group: FormGroup;
  component: ComponentRef<Field>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    // private checkboxService: CheckboxValuePosterService
  ) { }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supporttedTypes = Object.keys(components).join(',');
      throw new Error(
        `supporttedTypes are ${supporttedTypes}`
      );
    }
    const componetFactory = this.componentFactoryResolver.resolveComponentFactory(components[this.config.type]);
    this.component = this.viewContainerRef.createComponent(componetFactory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }
}
