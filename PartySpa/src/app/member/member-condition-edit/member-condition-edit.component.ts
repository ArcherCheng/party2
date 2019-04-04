import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/_shared/interface/User';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { UserCondition } from 'src/app/_shared/interface/UserCondition';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-condition-edit',
  templateUrl: './member-condition-edit.component.html',
  styleUrls: ['./member-condition-edit.component.css']
})
export class MemberConditionEditComponent implements OnInit {
  // @ViewChild('editForm') editForm: NgForm;
  @Input() user: User;
  myFormGroup: FormGroup;
  userCondition: UserCondition;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.route.data.subscribe((data: {apiResult: UserCondition}) => {
    //   this.userCondition = data.apiResult;
    // });
    // this.userCondition = this.user.userCondition;
    this.createMyFormGroup();

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

}
