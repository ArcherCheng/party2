import { Component, OnInit } from '@angular/core';
import { CheckboxItem } from 'src/app/_shared/dynamic-form/interface/checkbox-item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkbox-from-template',
  templateUrl: './checkbox-from-template.component.html',
  styleUrls: ['./checkbox-from-template.component.css']
})
export class CheckboxFromTemplateComponent implements OnInit {
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

  editFrom: NgForm;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.userRolesOptions = this.userRoles.map(x => new CheckboxItem(x.keyId, x.keyValue, false));
    }, 1000);
  }

  OnRolesChanges(value) {
    this.userModel.roles = value;
    console.log('model role', this.userModel.roles);
  }

  onSubmit() {
    console.log(this.userModel);
  }

}
