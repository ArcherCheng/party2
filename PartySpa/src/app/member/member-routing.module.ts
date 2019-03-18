import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberEditResolverService } from './member-edit/member-edit-resolver.service';
import { MemberMatchListComponent } from './member-match-list/member-match-list.component';

const routes: Routes = [
   {
    path: 'edit',
    component: MemberEditComponent,
    resolve: {apiResult: MemberEditResolverService}
  },
  {
    path: 'match',
    component: MemberMatchListComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
