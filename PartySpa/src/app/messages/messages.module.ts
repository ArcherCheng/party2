import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [MyMessagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PaginationModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
