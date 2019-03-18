import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberDetailResolverService } from './member-detail/member-detail-resolver.service';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberEditResolverService } from './member-edit/member-edit-resolver.service';

const routes: Routes = [

  {
    path: ':userId/memberDetail',
    component: MemberDetailComponent,
    resolve: {apiResult: MemberDetailResolverService}
  },
  {
    path: 'edit',
    component: MemberEditComponent,
    resolve: {apiResult: MemberEditResolverService}
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
