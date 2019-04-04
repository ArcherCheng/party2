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
import { PartyUpdateComponent } from './party-update/party-update.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'member',
        component: MemberListComponent,
        resolve: {apiResult: MemberListResolverService}
      },
      {
        path: 'member/update/:userId',
        component: MemberUpdateComponent,
      },
      {
        path: 'party',
        component: PartyListComponent,
        resolve: {apiResult: PartyListResolverService}
      },
      {
        path: 'party/add',
        component: PartyAddComponent,
      },
      {
        path: 'party/update/:partyId',
        component: PartyUpdateComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
