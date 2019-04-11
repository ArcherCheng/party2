import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/_shared/interface/party';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { ActivityService } from 'src/app/_shared/service/Activity.service';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {
  party: Party;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: Party}) => this.party = data.apiResult);
  }

  sendActivityOrder(partyId: number) {
    if (!this.authService.isLoggedIn()) {
      this.alertify.warning('您尚未登入,無法使用本功能');
      return;
    }
    this.alertify.confirm('確定要參加這一場活動嗎?', () => {
      this.activityService.sendActivityOrder(this.authService.decodedToken.nameid, partyId)
      .subscribe(
        data => {
          this.alertify.success('恭喜您,已經報名成功本活動:' + this.party.partyName);
        }, error => {
          this.alertify.error(error.error);
        }
      );
    });
  }
}
