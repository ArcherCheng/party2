import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/_shared/interface/activity';

@Component({
  selector: 'app-acticity-audit',
  templateUrl: './acticity-audit.component.html',
  styleUrls: ['./acticity-audit.component.css']
})
export class ActicityAuditComponent implements OnInit {
  actrivityList: Activity[];
  actitityModel: Activity;

  constructor() { }

  ngOnInit() {
  }

}
