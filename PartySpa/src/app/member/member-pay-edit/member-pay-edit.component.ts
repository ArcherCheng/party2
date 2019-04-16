import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/_shared/interface/activity';
import { Route } from '@angular/compiler/src/core';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-pay-edit',
  templateUrl: './member-pay-edit.component.html',
  styleUrls: ['./member-pay-edit.component.css']
})
export class MemberPayEditComponent implements OnInit {
  activity: Activity;
  editForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.setCurrentTitle('我的轉帳資料');
    this.route.data.subscribe((data: {apiResult: Activity}) => {
      this.activity = data.apiResult;
    });
  }

  onSubmit() {
    this.userService.updateMyPartyPay(this.authService.decodedToken.nameid, this.activity.partyId,
      this.activity).subscribe(next => {
        this.alertify.success('存檔成功');
        // this.editForm.reset();
      }, error => {
        this.alertify.error(error.error);
      });
  }

}
