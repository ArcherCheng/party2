import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityLikeListComponent } from './activity-like-list/activity-like-list.component';
import { ActivityMemberListComponent } from './activity-member-list/activity-member-list.component';
import { SharedModule } from '../_shared/shared.module';
import { MemberModule } from '../member/member.module';
import { MemberCardComponent } from '../member/member-card/member-card.component';

@NgModule({
  declarations: [
    ActivityMemberListComponent,
    ActivityLikeListComponent,
    MemberCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    // MemberModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule { }
