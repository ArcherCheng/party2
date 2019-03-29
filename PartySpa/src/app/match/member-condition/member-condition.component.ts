import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserCondition } from 'src/app/_shared/interface/UserCondition';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { StarList } from 'src/app/_shared/enum/star-list';
import { BloodList } from 'src/app/_shared/enum/blood-list';
import { JobTypeList } from 'src/app/_shared/enum/job-typr-list';
import { ReligionList } from 'src/app/_shared/enum/religion-list';
import { CityList } from 'src/app/_shared/enum/city-list';
import { CheckboxValuesPosterService } from 'src/app/_shared/service/checkbox-values-poster.service';

@Component({
  selector: 'app-member-condition',
  templateUrl: './member-condition.component.html',
  styleUrls: ['./member-condition.component.css']
})
export class MemberConditionComponent implements OnInit {
  myFormGroup: FormGroup;
  userCondition: UserCondition;
  checkbocValObj = {};
  bloodList = BloodList;
  religionList = ReligionList;
  starList = StarList;
  cityList = CityList;
  jobList = JobTypeList;

  bloodSelected = new Array();
  starSelected = new Array();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService,
    private checkBoxService: CheckboxValuesPosterService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: UserCondition}) => {
      this.userCondition = data.apiResult;
      this.bloodSelected = this.userCondition.bloodInclude.split(',');
      this.starSelected = this.userCondition.starInclude.split(',');
      this.createMyFormGroup();
      // console.log(this.bloodSelected);
      // console.log(this.starSelected);
      // console.log(this.myFormGroup);
      // this.addCheckboxs();
      // console.log(this.bloodInclude);
    });

  }

  createMyFormGroup() {
      this.myFormGroup = this.fb.group({
        marryMin: [this.userCondition.marryMin, Validators.required],
        marryMax: [this.userCondition.marryMax, Validators.required],
        oldsMin: [this.userCondition.oldsMin, Validators.required],
        oldsMax: [this.userCondition.oldsMax, Validators.required],
        educationMin: [this.userCondition.educationMin, Validators.required],
        educationMax: [this.userCondition.educationMax, Validators.required],
        heightsMin: [this.userCondition.heightsMin, Validators.required],
        heightsMax: [this.userCondition.heightsMax, Validators.required],
        weightsMin: [this.userCondition.weightsMin, Validators.required],
        weightsMax: [this.userCondition.weightsMax, Validators.required],
        salaryMin: [this.userCondition.salaryMin, Validators.required],
        bloodInclude: [this.userCondition.bloodInclude],
        starInclude: [this.userCondition.starInclude],
        cityInclude: [this.userCondition.bloodInclude],
        jobTypeInclude: [this.userCondition.starInclude],
        religionInclude: [this.userCondition.bloodInclude],
      });
  }

  // get bloodInclude(): FormArray {
  //   return this.myFormGroup.get('bloodInclude') as FormArray;
  // }

  // addCheckboxs() {
  //   this.bloodList.map((o , i) => {
  //     const control = new FormControl(false);
  //     // (this.myFormGroup.controls.bloodInclue as FormArray).push(control);
  //     this.bloodInclude.push(control);
  //   });

  //   this.bloodSelected.forEach(value => {
  //     const index: number = this.bloodList.findIndex(item => item === value);
  //     // console.log(value, index);
  //     if (index >= 0) {
  //       this.bloodInclude.get(index.toString()).setValue(true);
  //     }
  //   });
  // }

  onSubmit(value) {
    this.checkBoxService.getValue().subscribe(val => ({
      valid: this.myFormGroup.valid,
      formVal: this.myFormGroup.contains,
      checkboxVal: val
    }));

    console.log(value);
    console.log(this.checkBoxService.vals);

  }

  bloodPushValue(check, item) {
    let orgItem = this.userCondition.bloodInclude.split(',');
    const haveItem = orgItem.includes(item);
    console.log(check, item);
    if (check) {
      if (!haveItem) {
        orgItem.push(item);
      }
    } else {
      if (haveItem) {
        orgItem = orgItem.filter((ele) => {
          return ele !== item;
        });
      }
    }
    // tslint:disable-next-line:no-string-literal
    this.checkbocValObj['bloodInclue'] = orgItem;
    this.checkBoxService.postValue(this.checkbocValObj);
    console.log(this.checkbocValObj);
  }

  PushValue(check, item) {
    let orgItem = this.userCondition.starInclude.split(',');
    const haveItem = orgItem.includes(item);
    console.log(check, item);
    if (check) {
      if (!haveItem) {
        orgItem.push(item);
      }
    } else {
      if (haveItem) {
        orgItem = orgItem.filter((ele) => {
          return ele !== item;
        });
      }
    }
    // tslint:disable-next-line:no-string-literal
    this.checkbocValObj['starInclue'] = orgItem;
    this.checkBoxService.postValue(this.checkbocValObj);
    console.log(this.checkbocValObj);

  }
}
