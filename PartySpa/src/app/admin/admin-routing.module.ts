import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../_shared/guard/admin.guard';
import { AuthGuard } from '../_shared/guard/auth.guard';

import { PartyListComponent } from './party-list/party-list.component';
import { PartyListResolverService } from './party-list/party-list-resolver.service';
import { PartyAddComponent } from './party-add/party-add.component';
import { PartyAddResolverService } from './party-add/party-add-resolver.service';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberListResolverService } from './member-list/member-list-resolver.service';
import { ActivityAuditComponent } from './activity-audit/activity-audit.component';
import { ActivityAuditResolverService } from './activity-audit/activity-audit-resolver.service';
import { PartyPhotoAddComponent } from './party-photo-add/party-photo-add.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'party',
        component: PartyListComponent,
        resolve: {apiResult: PartyListResolverService}
      },
      {
        path: 'party/add/:partyId',
        component: PartyAddComponent,
        resolve: {apiResult: PartyAddResolverService}
      },
      {
        path: 'party/activity/:partyId/audit',
        component: ActivityAuditComponent,
        resolve: {apiResult: ActivityAuditResolverService}
      },
      {
        path: 'party/partyPhoto/:partyId/add',
        component: PartyPhotoAddComponent,
      },
      {
        path: 'member',
        component: MemberListComponent,
        resolve: {apiResult: MemberListResolverService}
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
