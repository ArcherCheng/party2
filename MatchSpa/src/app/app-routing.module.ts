import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeResolverService } from './home/home-resolver.service';

const routes: Routes = [
  {path: 'home', component: HomeComponent, resolve: {apiResult: HomeResolverService}},
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
