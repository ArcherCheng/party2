import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { PartyListComponent } from './party-list/party-list.component';
import { AdminGuard } from '../_shared/guard/admin.guard';
import { AuthGuard } from '../_shared/guard/auth.guard';
import { MemberListResolverService } from './member-list/member-list-resolver.service';
import { MemberUpdateComponent } from './member-update/member-update.component';
import { PartyListResolverService } from './party-list/party-list-resolver.service';
import { PartyAddComponent } from './party-add/party-add.component';
import { PartyAddResolverService } from './party-add/party-add-resolver.service';

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
        path: 'member',
        component: MemberListComponent,
        resolve: {apiResult: MemberListResolverService}
      },
      {
        path: 'member/update/:userId',
        component: MemberUpdateComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
