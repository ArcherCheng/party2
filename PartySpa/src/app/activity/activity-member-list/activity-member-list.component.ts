import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_shared/interface/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { ActivityService } from 'src/app/_shared/service/Activity.service';

@Component({
  selector: 'app-activity-member-list',
  templateUrl: './activity-member-list.component.html',
  styleUrls: ['./activity-member-list.component.css']
})
export class ActivityMemberListComponent implements OnInit {
  userList: User[];
  user: User;
  currentPartyId = 0;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public authService: AuthService,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiListResult: User[]}) => this.userList = data.apiListResult);
    this.currentPartyId = +this.route.snapshot.params.partyId;
  }

  sendLike(likeId: number) {
    this.alertify.confirm('確定要投票給這個人嗎?', () => {
      this.activityService.sendActivityLike(
        this.authService.decodedToken.nameid,
        this.route.snapshot.params.partyId,
        likeId
      ).subscribe(() => {
        this.alertify.success('投票成功');
      }, error => {
        this.alertify.error(error.error);
      });
    });
  }

}
