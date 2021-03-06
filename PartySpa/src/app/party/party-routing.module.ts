import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { PartyActivityListComponent } from './party-activity-list/party-activity-list.component';
import { PartyHistoryListComponent } from './party-history-list/party-history-list.component';
import { PartyDetailResolverService } from './party-detail/party-detail-resolver.service';
import { PartyHistoryListResolverService } from './party-history-list/party-history-list-resolver.service';
import { PartyActivityListResolverService } from './party-activity-list/party-activity-list-resolver.service';
import { PartyPhotoListComponent } from './party-photo-list/party-photo-list.component';
import { PartyPhotoListResolverService } from './party-photo-list/party-photo-list-resolver.service';
// import { PartyMatchResultComponent } from './party-match-result/party-match-result.component';
// import { PartyMatchResultResolverService } from './party-match-result/party-match-result-resolver.service';
import { PartyVoteResultComponent } from './party-vote-result/party-vote-result.component';
import { PartyVoteResultResolverService } from './party-vote-result/party-vote-result-resolver.service';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: PartyDetailComponent,
    resolve: {apiResult: PartyDetailResolverService}
  },
  {
    path: 'activityList',
    component: PartyActivityListComponent,
    resolve: {apiListResult: PartyActivityListResolverService}
  },
  {
    path: 'historyList',
    component: PartyHistoryListComponent,
    resolve: {apiPaginationResult: PartyHistoryListResolverService}
  },
  {
    path: ':partyId/photoList',
    component: PartyPhotoListComponent,
    resolve: {apiResultList: PartyPhotoListResolverService}
  },
  {
    path: ':partyId/voteResult',
    component: PartyVoteResultComponent,
    resolve: {apiResult: PartyVoteResultResolverService}
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyRoutingModule {}
