import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_shared/guard/auth.guard';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchListResolverService } from './match-list/match-list-resolver.service';
import { MatchConditionComponent } from './match-condition/match-condition.component';
import { MatchConditionResolverService } from './match-condition/match-condition-resolver.service';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'myCondition',
        component: MatchConditionComponent,
        resolve: {apiResult: MatchConditionResolverService}
      },
      {
        path: 'myMatchList',
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
