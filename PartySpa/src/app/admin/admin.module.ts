import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { PartyListComponent } from './party-list/party-list.component';
import { PartyAddComponent } from './party-add/party-add.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ActicityAuditComponent } from './acticity-audit/acticity-audit.component';
import { MemberBlackComponent } from './member-black/member-black.component';
import { PartyPhotoAddComponent } from './party-photo-add/party-photo-add.component';

@NgModule({
  declarations: [
    MemberListComponent,
    PartyListComponent,
    PartyAddComponent,
    ActicityAuditComponent,
    MemberBlackComponent,
    PartyPhotoAddComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
