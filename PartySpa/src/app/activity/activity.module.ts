import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';

import { ActivityLikeListComponent } from './activity-like-list/activity-like-list.component';
import { ActivityMemberListComponent } from './activity-member-list/activity-member-list.component';
// import { MemberDetailComponent } from '../member/member-detail/member-detail.component';
// import { MemberMessageComponent } from '../member/member-message/member-message.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxGalleryModule } from 'ngx-gallery';
// import { FileUploadModule } from 'ng2-file-upload';
// import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    ActivityMemberListComponent,
    ActivityLikeListComponent,
    // MemberDetailComponent,
    // MemberMessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActivityRoutingModule,
    // NgxGalleryModule,
    // FileUploadModule,
    // TabsModule.forRoot()
  ]
})
export class ActivityModule { }
