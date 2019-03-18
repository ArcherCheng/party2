import { Component, OnInit, Input } from '@angular/core';
import { Party } from '../../interface/party';

@Component({
  selector: 'app-party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.css']
})
export class PartyCardComponent implements OnInit {
  @Input() party: Party;

  constructor() { }

  ngOnInit() {
  }

}
