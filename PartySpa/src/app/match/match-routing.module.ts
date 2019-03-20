import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_shared/guard/auth.guard';
import { MemberConditionComponent } from './member-condition/member-condition.component';
import { MemberConditionResolverService } from './member-condition/member-condition-resolver.service';
import { MatchListComponent } from './match-list/match-list.component';

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
        path: 'match',
        component: MatchListComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
