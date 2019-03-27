import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyRoutingModule } from './party-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { PartyActivityListComponent } from './party-activity-list/party-activity-list.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { PartyHistoryListComponent } from './party-history-list/party-history-list.component';
import { PartyPhotoListComponent } from './party-photo-list/party-photo-list.component';
import { PartyMatchResultComponent } from './party-match-result/party-match-result.component';

@NgModule({
  declarations: [
    PartyDetailComponent,
    PartyActivityListComponent,
    PartyHistoryListComponent,
    PartyPhotoListComponent,
    PartyMatchResultComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PartyRoutingModule,
  ]
})
export class PartyModule { }
