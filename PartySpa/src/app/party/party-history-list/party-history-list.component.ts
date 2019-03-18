import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/_shared/interface/party';
import { Pagination, PaginatedResult } from 'src/app/_shared/interface/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PartyService } from 'src/app/_shared/service/party.service';

@Component({
  selector: 'app-party-history-list',
  templateUrl: './party-history-list.component.html',
  styleUrls: ['./party-history-list.component.css']
})
export class PartyHistoryListComponent implements OnInit {
  partyList: Party[];
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute,
    alertify: AlertifyService,
    partyService: PartyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiPaginationResult: PaginatedResult<Party[]>}) => {
      this.partyList = data.apiPaginationResult.result;
      this.pagination = data.apiPaginationResult.pagination;
    });
  }

}
