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
        marryMin: [0, Validators.required],
        marryMax: [0, Validators.required],
        oldsMin: [0, Validators.required],
        oldsMax: [0, Validators.required],
        educationMin: [0, Validators.required],
        educationMax: [0, Validators.required],
        heightsMin: [0, Validators.required],
        heightsMax: [0, Validators.required],
        weightsMin: [0, Validators.required],
        weightsMax: [0, Validators.required],
        salaryMin: [0, Validators.required],
        // salaryMax: [this.userCondition.salaryMax, Validators.required],
        bloodInclude: [''],
        cityInclude: [''],
        starInclude: [''],
        jobTypeInclude: [''],
        religionInclude: [''],
      });
  }

  onSubmit() {
    // this.userService.updateMember()

  }

}
