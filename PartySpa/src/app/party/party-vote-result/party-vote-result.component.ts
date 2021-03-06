import { Component, OnInit } from '@angular/core';
import { PartySummary } from 'src/app/_shared/interface/party-summary';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { PartyService } from 'src/app/_shared/service/party.service';

@Component({
  selector: 'app-party-vote-result',
  templateUrl: './party-vote-result.component.html',
  styleUrls: ['./party-vote-result.component.css']
})
export class PartyVoteResultComponent implements OnInit {
  partySummary: PartySummary;

  constructor(
    private route: ActivatedRoute,
    // private alertify: AlertifyService,
    // private authService: AuthService,
    // private partyService: PartyService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: PartySummary}) => this.partySummary = data.apiResult);
  }


}
