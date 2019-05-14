import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMatchRoutingModule } from './my-match-routing.module';
import { MyDetailComponent } from './my-detail/my-detail.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { SharedModule } from '../_shared/shared-module';

@NgModule({
  declarations: [
    MyDetailComponent,
    MyFriendsComponent,
    MyPhotosComponent,
    MyMessagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MyMatchRoutingModule
  ]
})
export class MyMatchModule { }
