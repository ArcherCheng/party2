import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AdminService } from 'src/app/_shared/service/admin.service';
import { Activity } from 'src/app/_shared/interface/activity';

@Component({
  selector: 'app-activity-audit',
  templateUrl: './activity-audit.component.html',
  styleUrls: ['./activity-audit.component.css']
})
export class ActivityAuditComponent implements OnInit {
  activityList: Activity[];

  constructor(
    private route: ActivatedRoute,
    private alertofy: AlertifyService,
    private authService: AuthService,
    private adimnService: AdminService
  ) { }

  ngOnInit() {
    this.authService.setCurrentTitle('報名核對及現場編號');
    this.route.data.subscribe((data: {apiResult: Activity[]}) => {
      this.activityList = data.apiResult;
    });
  }

}
