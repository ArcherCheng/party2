import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_shared/service/admin.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PaginatedResult, Pagination } from 'src/app/_shared/interface/pagination';
import { User } from 'src/app/_shared/interface/User';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  userList: User[];
  pagination: Pagination;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiResult: PaginatedResult<User[]>}) => {
      this.userList = data.apiResult.result;
      this.pagination = data.apiResult.pagination;
      // console.log(data.apiResult);
    });
    this.authService.setCurrentTitle('會員資料維護');
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPageData();
  }

  loadPageData() {
    this.adminService.getMemberList(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.userList = res.result;
        this.pagination = res.pagination;
        window.scrollTo(0, 0);

      }, error => {
        this.alertify.error(error.error);
      }
    );
  }

}
