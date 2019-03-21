import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-member-condition',
  templateUrl: './member-condition.component.html',
  styleUrls: ['./member-condition.component.css']
})
export class MemberConditionComponent implements OnInit {
  myFormGroup: FormGroup;
  userCondition: UserCondition;
  bloodList = BloodList;
  religionList = ReligionList;
  starList = StarList;
  cityList = CityList;
  jobList = JobTypeList;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: UserCondition}) => {
      this.userCondition = data.apiResult;
      this.createMyFormGroup();
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
        // salaryMax: [this.userCondition.salaryMax, Validators.required],
        bloodInclude: [this.userCondition.bloodInclude],
        cityInclude: [this.userCondition.cityInclude],
        starInclude: [this.userCondition.starInclude],
        jobTypeInclude: [this.userCondition.jobTypeInclude],
        religionInclude: [this.userCondition.religionInclude],
      });
  }

  onSubmit() {
    // this.userService.updateMember()

  }

  pushValue(check, item) {
    // const haveItem = this.checkboxVal.includes(item);
    // if (check) {
    //   if (!haveItem) {
    //     this.checkboxVal.push(item);
    //   }
    // } else {
    //   if (haveItem) {
    //     this.checkboxVal = this.checkboxVal.filter((ele) => {
    //       return ele !== item;
    //     });
    //   }
    // }
    // this.checkbocValObj[this.config.name] = this.checkboxVal;
    // this.checkboxValueService.postValue(this.checkbocValObj);
  }


}
