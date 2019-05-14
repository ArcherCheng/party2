import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_shared/interface/pagination';
import { Party } from 'src/app/_shared/interface/party';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AdminService } from 'src/app/_shared/service/admin.service';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {
  partyList: Party[];
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private adminService: AdminService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: PaginatedResult<Party[]>}) => {
      this.partyList = data.apiResult.result;
      this.pagination = data.apiResult.pagination;
      // console.log(data.apiResult);
    });
    this.authService.setCurrentTitle('活動資料維護');
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPageData();
  }

  loadPageData() {
    this.adminService.getPartyList(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<Party[]>) => {
        this.partyList = res.result;
        this.pagination = res.pagination;
        window.scrollTo(0, 0);
      }, error => {
        this.alertify.error(error.error);
      }
    );
  }

}
