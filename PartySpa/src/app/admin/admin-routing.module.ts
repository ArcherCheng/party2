import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { PartyListComponent } from './party-list/party-list.component';
import { AdminGuard } from '../_shared/guard/admin.guard';
import { AuthGuard } from '../_shared/guard/auth.guard';
import { MemberListResolverService } from './member-list/member-list-resolver.service';
import { PartyListResolverService } from './party-list/party-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'member',
        component: MemberListComponent,
        //  resolve: {apiResult: MemberListResolverService}
      },
      {
        path: 'party',
        component: PartyListComponent,
        // resolve: {apiResult: PartyListResolverService}
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
