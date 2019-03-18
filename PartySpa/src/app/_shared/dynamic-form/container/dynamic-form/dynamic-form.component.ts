import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interface/field-config';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/take';
// import { element } from 'protractor';
import { CheckboxValuePosterService } from '../../service/checkbox-value-poster.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input()
  configs: FieldConfig[] = [];

  @Output()
  submit = new EventEmitter<any>();

  form: FormGroup;

  get controls() { return this.configs.filter(item => item.type !== 'button'); }
  // get Changes(): Observable<any> { return this.form.valueChanges; }
  get Changes() { return this.form.valueChanges; }
  get value() { return this.form.value; }
  get valid() { return this.form.valid; }

  constructor(private fb: FormBuilder, private checkBoxService: CheckboxValuePosterService) { }

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    console.log(1);
    if (this.form) {
      this.checkBoxService.claerValue();
      const settedControls = Object.keys(this.form.controls);
      const controlToSet = this.controls.map(item => item.name);

      settedControls
      .filter(controlName => !controlToSet.includes(controlName))
      .forEach(controlName => {this.form.removeControl(controlName); });

      controlToSet
      .filter(controlName => !settedControls.includes(controlName))
      .forEach(controlName => {
        const config = this.controls.find(item => item.name === controlName);
        this.form.addControl(controlName, this.createControl(config));
      });
    }
  }

  createGroup(): FormGroup {
    const group = this.fb.group({});
    this.controls.forEach(config => {
      group.addControl(config.name, this.createControl(config));
    });
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, value, validations } = config;
    return this.fb.control({disabled, value}, validations);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    // this.submit.emit(this.value);
    this.checkBoxService.getValue().subscribe(val => this.submit.emit({
      valid: this.valid,
      formVal: this.value,
      checkboxVal: val
    }));

  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }
    this.configs.forEach(item => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

}
