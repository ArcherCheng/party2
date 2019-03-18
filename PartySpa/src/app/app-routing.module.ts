import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PartyListResolverService } from './home/party-list-resolver.service';
import { TestDynamicFormComponent } from './test-dynamic-form/test-dynamic-form.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, resolve: {apiListResult: PartyListResolverService}},
  {path: 'test', component: TestDynamicFormComponent},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'party', loadChildren: './party/party.module#PartyModule'},
  {path: 'member', loadChildren: './member/member.module#MemberModule'},
  {path: 'activity', loadChildren: './activity/activity.module#ActivityModule'},
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {
  //   enableTracing: true,
  //   preloadingStrategy: PreloadAllModules
  // })],

  imports: [RouterModule.forRoot(routes, {
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
