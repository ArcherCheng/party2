import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberEditResolverService } from './member-edit/member-edit-resolver.service';
import { MemberPartyListComponent } from './member-party-list/member-party-list.component';
import { AuthGuard } from '../_shared/guard/auth.guard';

const routes: Routes = [
   {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit',
        component: MemberEditComponent,
        resolve: {apiResult: MemberEditResolverService}
      },
      {
        path: 'partyList',
        component: MemberPartyListComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
