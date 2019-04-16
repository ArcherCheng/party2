import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { ActivityService } from 'src/app/_shared/service/Activity.service';
import { User } from 'src/app/_shared/interface/User';

@Component({
  selector: 'app-activity-like-list',
  templateUrl: './activity-like-list.component.html',
  styleUrls: ['./activity-like-list.component.css']
})
export class ActivityLikeListComponent implements OnInit {
  userList: User[];
  // user: User;
  currentPartyId = 0 ;
  likesParam =  '1';
  photoUrl: string;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiListResult: User[]}) => this.userList = data.apiListResult);
    // console.log(this.userList);
    this.currentPartyId = +this.route.snapshot.params.partyId;
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  loadMembers(isMylike: number) {
    this.activityService.getActivityLikeList(this.authService.decodedToken.nameid, this.currentPartyId, isMylike)
    .subscribe((users: User[]) => {
      this.userList = users;
    }, error => {
      this.alertify.error(error);
    });
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
