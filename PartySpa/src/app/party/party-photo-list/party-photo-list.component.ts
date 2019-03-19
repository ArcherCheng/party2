import { Component, OnInit } from '@angular/core';
import { PartyPhoto } from 'src/app/_shared/interface/party-photo';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { PartyService } from 'src/app/_shared/service/party.service';

@Component({
  selector: 'app-party-photo-list',
  templateUrl: './party-photo-list.component.html',
  styleUrls: ['./party-photo-list.component.css']
})
export class PartyPhotoListComponent implements OnInit {
  partyPhotos: PartyPhoto[];

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    // private alertify: AlertifyService,
    // private authService: AuthService,
    // private partyService: PartyService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResultList: PartyPhoto[]}) => this.partyPhotos = data.apiResultList);
  }

}
