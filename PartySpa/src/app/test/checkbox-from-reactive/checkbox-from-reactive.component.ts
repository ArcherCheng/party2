import { Component, OnInit } from '@angular/core';
import { CheckboxItem } from 'src/app/_shared/dynamic-form/interface/checkbox-item';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-from-reactive',
  templateUrl: './checkbox-from-reactive.component.html',
  styleUrls: ['./checkbox-from-reactive.component.css']
})
export class CheckboxFromReactiveComponent implements OnInit {
  private userRoles = [
    {keyId: 1, keyValue: 'Admin'},
    {keyId: 2, keyValue: 'Director'},
    {keyId: 3, keyValue: 'Professor'},
    {keyId: 4, keyValue: 'Student'},
    {keyId: 5, keyValue: 'Teacher'},
    {keyId: 6, keyValue: 'Supervisor'},
  ];

  public userModel = {
    id: 1,
    name: 'William',
    birthday: '1984-12-28',
    roles: ['Admin', 'Student']
  };

  userRolesOptions = new Array<CheckboxItem>();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    setTimeout(() => {
      this.userRolesOptions = this.userRoles.map(x => new CheckboxItem(x.keyId, x.keyValue, false));
    }, 1000);
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.fb.group({
      id: [this.userModel.id, Validators.required],
      name: [this.userModel.name, Validators.required],
      birthday: [this.userModel.birthday, Validators.required],
      roles: [this.userModel.roles, Validators.required],
    });
  }

  OnRolesChanges(value) {
    this.userModel.roles = value;
    this.form.controls.roles.setValue(value);
  }

  onSubmit(value) {
    console.log(this.form.value);
  }
}
