import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/_shared/interface/party';
import { Pagination, PaginatedResult } from 'src/app/_shared/interface/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PartyService } from 'src/app/_shared/service/party.service';
import { AuthService } from 'src/app/_shared/service/auth.service';

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
    private alertify: AlertifyService,
    private partyService: PartyService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiPaginationResult: PaginatedResult<Party[]>}) => {
      this.partyList = data.apiPaginationResult.result;
      this.pagination = data.apiPaginationResult.pagination;
    });
    this.authService.setCurrentTitle('歷史派對相簿');
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPageData();
  }

  loadPageData() {
    this.partyService.getHistoryList(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<Party[]>) => {
        this.partyList = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error.error);
      }
    );
  }

}
