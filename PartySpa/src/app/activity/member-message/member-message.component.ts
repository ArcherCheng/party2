import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { tap } from 'rxjs/operators';
import { MyMessage } from 'src/app/_shared/interface/myMessage';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {
  @Input() recipientId: number;
  @Input() partyId: number;
  messages: MyMessage[];
  newMessage: any = {};

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadMessage();
  }

  loadMessage() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(message => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < message.length; i++) {
          if (message[i].isRead === false && message[i].recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, message[i].id);
          }
        }
      })
    ).subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.partyId = this.partyId;
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
    .subscribe((message: MyMessage) => {
      this.messages.unshift(message);
      this.newMessage.contents = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
