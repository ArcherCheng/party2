import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_shared/guard/auth.guard';
import { MemberConditionComponent } from './member-condition/member-condition.component';
import { MemberConditionResolverService } from './member-condition/member-condition-resolver.service';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchListResolverService } from './match-list/match-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'condition',
        component: MemberConditionComponent,
        resolve: {apiResult: MemberConditionResolverService}
      },
      {
        path: 'matchList',
        component: MatchListComponent,
        resolve: {apiPaginatedResult: MatchListResolverService}
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
