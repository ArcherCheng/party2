import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityMemberListComponent } from './activity-member-list/activity-member-list.component';
import { ActivityMemberListResolverService } from './activity-member-list/activity-member-list-resolver.service';
import { ActivityLikeListComponent } from './activity-like-list/activity-like-list.component';
import { ActivityLikeListResolverService } from './activity-like-list/activity-like-list-resolver.service';

const routes: Routes = [
  {
    path: 'member/:userId/party/:partyId/memberList',
    component: ActivityMemberListComponent,
    resolve: {apiListResult: ActivityMemberListResolverService}
  },
  {
    path: 'member/:userId/party/:partyId/likeList',
    component: ActivityLikeListComponent,
    resolve: {apiListResult: ActivityLikeListResolverService}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
