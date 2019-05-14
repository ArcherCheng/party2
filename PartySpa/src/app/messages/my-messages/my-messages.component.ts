import { Component, OnInit, NgModule } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_shared/interface/pagination';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { MyMessage } from 'src/app/_shared/interface/myMessage';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {
  messages: MyMessage[] = [];
  pagination: Pagination;
  messageContainer = 'Unread';
  messageContainer2 = 'AAA Unread';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {apiPaginatedResult: PaginatedResult<MyMessage[]>}) => {
      this.messages = data.apiPaginatedResult.result;
      this.pagination = data.apiPaginatedResult.pagination;
    });
    this.authService.setCurrentTitle('我的留言管理');
  }

  loadMessages(messageContainer) {
    this.userService.getAllMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
        this.pagination.itemsPerPage, messageContainer)
          .subscribe((res: PaginatedResult<MyMessage[]>) => {
            this.messages = res.result;
            this.pagination = res.pagination;
            this.messageContainer = messageContainer;
            window.scrollTo(0, 0);
        }, error => {
          this.alertify.error(error);
        });
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages(this.messageContainer);
  }


  deleteMessage(id: number) {
    this.alertify.confirm('您確定要刪除此留言嗎?', () => {
      this.userService.deleteMessage(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('留言刪除成功');
      }, error => {
        this.alertify.error(error);
      });
    });
  }
}
