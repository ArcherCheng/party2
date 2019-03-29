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
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Director'},
    {id: 3, name: 'Professor'},
    {id: 4, name: 'Student'},
    {id: 5, name: 'Teacher'},
    {id: 6, name: 'Supervisor'},
  ];

  public userModel = {
    id: 1,
    name: 'William',
    birthday: '1984-12-28',
    roles: [2, 4]
  };

  userRolesOptions = new Array<CheckboxItem>();

  editFrom: NgForm;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.userRolesOptions = this.userRoles.map(x => new CheckboxItem(x.id, x.name));
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
