import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { PartyListComponent } from './party-list/party-list.component';
import { PartyAddComponent } from './party-add/party-add.component';
import { PartyUpdateComponent } from './party-update/party-update.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberUpdateComponent } from './member-update/member-update.component';

@NgModule({
  declarations: [
    PartyListComponent,
    PartyAddComponent,
    PartyUpdateComponent,
    MemberListComponent,
    MemberUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
