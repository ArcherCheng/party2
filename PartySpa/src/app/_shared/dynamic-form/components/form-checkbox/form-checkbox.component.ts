import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interface/field-config';
import { CheckboxValuePosterService } from '../../service/checkbox-value-poster.service';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.css']
})
export class FormCheckboxComponent implements OnInit {
  group: FormGroup;
  config: FieldConfig;
  checkboxVal = [];
  checkbocValObj = {};

  constructor(private checkboxValueService: CheckboxValuePosterService) { }

  ngOnInit() {
  }

  pushValue(check, item) {
    const haveItem = this.checkboxVal.includes(item);
    if (check) {
      if (!haveItem) {
        this.checkboxVal.push(item);
      }
    } else {
      if (haveItem) {
        this.checkboxVal = this.checkboxVal.filter((ele) => {
          return ele !== item;
        });
      }
    }
    this.checkbocValObj[this.config.name] = this.checkboxVal;
    this.checkboxValueService.postValue(this.checkbocValObj);
  }

}
