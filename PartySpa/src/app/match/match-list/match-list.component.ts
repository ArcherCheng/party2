import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_shared/interface/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { PaginatedResult, Pagination } from 'src/app/_shared/interface/pagination';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  userList: User[];
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: {apiPaginatedResult: PaginatedResult<User[]>}) => {
        this.userList = data.apiPaginatedResult.result;
        this.pagination = data.apiPaginatedResult.pagination;
      });
    this.authService.setCurrentTitle('我的配對結果');
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMatchUsers();
  }

  loadMatchUsers() {
    this.userService.getMyMatchList(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.userList = res.result;
      this.pagination = res.pagination;
      window.scrollTo(0, 0);
    }, error => {
      this.alertify.error(error.error);
    });
  }


}
