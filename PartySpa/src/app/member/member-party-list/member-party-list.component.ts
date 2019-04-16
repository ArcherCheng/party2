import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/_shared/interface/party';
import { PaginatedResult, Pagination } from 'src/app/_shared/interface/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Component({
  selector: 'app-member-party-list',
  templateUrl: './member-party-list.component.html',
  styleUrls: ['./member-party-list.component.css']
})
export class MemberPartyListComponent implements OnInit {
  partyList: Party[];
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
        (data: {apiPaginatedResult: PaginatedResult<Party[]>}) => {
          this.partyList = data.apiPaginatedResult.result;
          this.pagination = data.apiPaginatedResult.pagination;
        });
    this.authService.setCurrentTitle('我的報名活動');
    // console.log(this.partyList);
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPageData();
  }

  loadPageData() {
    this.userService.getMyPartyList(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe(
      (res: PaginatedResult<Party[]>) => {
        this.partyList = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error.error);
      }
    );
  }

}
