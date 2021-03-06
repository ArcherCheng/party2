import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeListResolverService } from './home/home-list-resolver.service';

const routes: Routes = [
  {path: 'home', component: HomeComponent, resolve: {apiListResult: HomeListResolverService}},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'party', loadChildren: './party/party.module#PartyModule'},
  {path: 'member', loadChildren: './member/member.module#MemberModule'},
  {path: 'messages', loadChildren: './messages/messages.module#MessagesModule'},
  {path: 'activity', loadChildren: './activity/activity.module#ActivityModule'},
  {path: 'match', loadChildren: './match/match.module#MatchModule'},
  {path: 'notes', loadChildren: './notes/notes.module#NotesModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path: 'test', loadChildren: './test/test.module#TestModule'},
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {
  //   enableTracing: true,
  //   preloadingStrategy: PreloadAllModules
  // })],

  imports: [RouterModule.forRoot(
    routes,
    { scrollPositionRestoration: 'top', enableTracing: false },
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
