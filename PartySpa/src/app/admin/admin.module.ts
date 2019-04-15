import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { PartyListComponent } from './party-list/party-list.component';
import { PartyAddComponent } from './party-add/party-add.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberUpdateComponent } from './member-update/member-update.component';
import { ActicityAuditComponent } from './acticity-audit/acticity-audit.component';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberUpdateComponent,
    PartyListComponent,
    PartyAddComponent,
    ActicityAuditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
