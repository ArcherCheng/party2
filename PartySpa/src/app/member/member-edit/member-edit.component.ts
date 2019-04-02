import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { User } from 'src/app/_shared/interface/User';
import { NgForm } from '@angular/forms';
import { CheckboxItem } from 'src/app/_shared/dynamic-form/interface/checkbox-item';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;
  bloodOptions = new Array<CheckboxItem>();
  starOptions =  new Array<CheckboxItem>();
  religionOptions = new Array<CheckboxItem>();
  cityOptions = new Array<CheckboxItem>();
  jobOptions = new Array<CheckboxItem>();

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: User}) => this.user = data.apiResult);
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.user.photoUrl = photoUrl);
    this.authService.setCurrentTitle('我的資料管理');
    this.loadCheckBoxItem();
  }

  loadCheckBoxItem() {
    this.authService.getCheckboxItemList('Blood').subscribe(data => this.bloodOptions = data);
    this.authService.getCheckboxItemList('Star').subscribe(data => this.starOptions = data);
    this.authService.getCheckboxItemList('City').subscribe(data => this.cityOptions = data);
    this.authService.getCheckboxItemList('Job').subscribe(data => this.jobOptions = data);
    this.authService.getCheckboxItemList('Religion').subscribe(data => this.religionOptions = data);
  }

  updateUser() {
    this.userService.updateMember(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('存檔成功');
      this.editForm.reset();
    }, error => {
      this.alertify.error(error.error);
    });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }


  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
  }

}
