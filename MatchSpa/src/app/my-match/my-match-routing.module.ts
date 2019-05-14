import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDetailComponent } from './my-detail/my-detail.component';
import { MyDetailResolverService } from './my-detail/my-detail-resolver.service';

const routes: Routes = [
  { path: 'myDetail', component: MyDetailComponent, resolve: { apiResult: MyDetailResolverService } },
  { path: '', redirectTo: 'myDetail', pathMatch: 'full' },
  { path: '**', redirectTo: 'myDetail', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMatchRoutingModule { }
