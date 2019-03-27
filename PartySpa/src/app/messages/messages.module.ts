import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
// import { FormsModule } from '@angular/forms';
// import { PaginationModule } from 'ngx-bootstrap';

import { MessagesRoutingModule } from './messages-routing.module';
import { MyMessagesComponent } from './my-messages/my-messages.component';
@NgModule({
  declarations: [MyMessagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MessagesRoutingModule
    // PaginationModule,
  ]
})
export class MessagesModule { }
