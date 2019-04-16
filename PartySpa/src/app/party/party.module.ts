import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyRoutingModule } from './party-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { PartyActivityListComponent } from './party-activity-list/party-activity-list.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { PartyHistoryListComponent } from './party-history-list/party-history-list.component';
import { PartyPhotoListComponent } from './party-photo-list/party-photo-list.component';
import { PartyVoteResultComponent } from './party-vote-result/party-vote-result.component';

@NgModule({
  declarations: [
    PartyDetailComponent,
    PartyActivityListComponent,
    PartyHistoryListComponent,
    PartyPhotoListComponent,
    PartyVoteResultComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PartyRoutingModule,
  ]
})
export class PartyModule { }
