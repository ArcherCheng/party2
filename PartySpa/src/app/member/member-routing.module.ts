import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberEditResolverService } from './member-edit/member-edit-resolver.service';
import { MemberPartyListComponent } from './member-party-list/member-party-list.component';
import { AuthGuard } from '../_shared/guard/auth.guard';
import { MemberPartyListResolverService } from './member-party-list/member-party-list-resolver.service';
import { MemberPayEditComponent } from './member-pay-edit/member-pay-edit.component';
import { MemberPayEditResolverService } from './member-pay-edit/member-pay-edit-resolver.service';

const routes: Routes = [
   {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'myEdit',
        component: MemberEditComponent,
        resolve: {apiResult: MemberEditResolverService}
      },
      {
        path: 'myPartyList',
        component: MemberPartyListComponent,
        resolve: {apiPaginatedResult: MemberPartyListResolverService}
      },
      {
        path: 'myPartyPay/:partyId',
        component: MemberPayEditComponent,
        resolve: {apiResult: MemberPayEditResolverService}
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
