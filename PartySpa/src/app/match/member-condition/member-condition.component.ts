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
import { CheckboxItem } from 'src/app/_shared/dynamic-form/interface/checkbox-item';

@Component({
  selector: 'app-member-condition',
  templateUrl: './member-condition.component.html',
  styleUrls: ['./member-condition.component.css']
})
export class MemberConditionComponent implements OnInit {
  userCondition: UserCondition;
  myFormGroup: FormGroup;

  bloodList = BloodList;
  bloodOptions = new Array<CheckboxItem>();
  bloodSelected = new Array();

  starList = StarList;
  starOptions = new Array<CheckboxItem>();
  starSelected = new Array();

  religionList = ReligionList;
  religionOptions = new Array<CheckboxItem>();
  religionSelected = new Array();

  cityList = CityList;
  cityOptions = new Array<CheckboxItem>();
  citySelected = new Array();

  jobList = JobTypeList;
  jobOptions = new Array<CheckboxItem>();
  jobSelected = new Array();


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: UserCondition}) => {
      this.userCondition = data.apiResult;

      this.bloodOptions = this.bloodList.map(val => new CheckboxItem(val, val, false));
      if (this.userCondition.bloodInclude) {
        this.bloodSelected = this.userCondition.bloodInclude.split(',');
      }

      this.starOptions = this.starList.map(val => new CheckboxItem(val, val, false));
      if (this.userCondition.starInclude) {
        this.starSelected = this.userCondition.starInclude.split(',');
      }

      this.jobOptions = this.jobList.map(val => new CheckboxItem(val, val, false));
      if (this.userCondition.jobTypeInclude) {
        this.jobSelected = this.userCondition.jobTypeInclude.split(',');
      }

      this.cityOptions = this.cityList.map(val => new CheckboxItem(val, val, false));
      if (this.userCondition.cityInclude) {
        this.citySelected = this.userCondition.cityInclude.split(',');
      }

      this.religionOptions = this.religionList.map(val => new CheckboxItem(val, val, false));
      if (this.userCondition.religionInclude) {
        this.religionSelected = this.userCondition.religionInclude.split(',');
      }
    });
    this.createFormGroup();

  }

  createFormGroup() {
      this.myFormGroup = this.fb.group({
        userId: [this.userCondition.userId],
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
        cityInclude: [this.userCondition.cityInclude],
        jobTypeInclude: [this.userCondition.jobTypeInclude],
        religionInclude: [this.userCondition.bloodInclude],
      });
  }

  onSubmit(value) {
    this.userService.updateCondition(this.authService.decodedToken.nameid, this.myFormGroup.value).subscribe(next => {
      this.alertify.success('存檔成功');
    }, error => {
      this.alertify.error(error.error);
    });
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
    // this.checkbocValObj['starInclue'] = orgItem;
    // this.checkBoxService.postValue(this.checkbocValObj);
    // console.log(this.checkbocValObj);

  }

  onBloodChenges(value) {
    this.myFormGroup.controls.bloodInclude.setValue(value.join(','));
  }

  onStarChenges(value) {
    this.myFormGroup.controls.starInclude.setValue(value.join(','));
  }

  onCityChenges(value) {
    this.myFormGroup.controls.cityInclude.setValue(value.join(','));
  }

  onJobChenges(value) {
    this.myFormGroup.controls.jobTypeInclude.setValue(value.join(','));
  }

  onReligionChenges(value) {
    this.myFormGroup.controls.religionInclude.setValue(value.join(','));
  }



}
