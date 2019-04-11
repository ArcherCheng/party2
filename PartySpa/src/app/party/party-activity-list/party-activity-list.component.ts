import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/_shared/interface/party';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PartyService } from 'src/app/_shared/service/party.service';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Component({
  selector: 'app-party-activity-list',
  templateUrl: './party-activity-list.component.html',
  styleUrls: ['./party-activity-list.component.css']
})
export class PartyActivityListComponent implements OnInit {
  partyList: Party[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService,
    private activityService: PartyService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiListResult: Party[]}) => this.partyList = data.apiListResult);
    this.authService.setCurrentTitle('互動派對投票');
  }

  activityMemberList(partyId: number) {
    if (!this.authService.isLoggedIn()) {
      this.alertify.warning('您尚未登入，無法查詢參加人員名單');
      // this.router.navigate(['/login/login']);
    } else {
      // this.alertify.warning('activityMemberList');
      this.router.navigate(['activity/member', this.authService.decodedToken.nameid, 'party', partyId, 'memberList']);
    }
  }

  activityLikeList(partyId: number) {
    if (!this.authService.isLoggedIn()) {
      this.alertify.warning('請先登入系統，才可以查詢您個人的投票配對名單');
    } else {
      // this.alertify.warning('activityLikeList');
      this.router.navigate(['activity/member', this.authService.decodedToken.nameid, 'party', partyId, 'likeList']);
    }
  }

}
