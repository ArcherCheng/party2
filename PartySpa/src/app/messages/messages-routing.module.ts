import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { MyMessagesResolverService } from './my-messages/my-messages-resolver.service';
import { AuthGuard } from '../_shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: MyMessagesComponent,
    resolve: {apiPaginatedResult: MyMessagesResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
