import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_shared/service/alertify.service';
import { PartyService } from '../_shared/service/party.service';
import { Party } from '../_shared/interface/party';
import { AuthService } from '../_shared/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  partyList: Party[];

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private partyService: PartyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.partyList = data.apiListResult);
    this.authService.setCurrentTitle('單身派對活動');

  }

}
