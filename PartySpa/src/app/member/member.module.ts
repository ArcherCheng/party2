import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { MemberRoutingModule } from './member-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberMatchListComponent } from './member-match-list/member-match-list.component';
import { MemberMessageComponent } from './member-message/member-message.component';
import { MemberConditionEditComponent } from './member-condition-edit/member-condition-edit.component';
import { MemberPhotoEditComponent } from './member-photo-edit/member-photo-edit.component';

@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberCardComponent,
    MemberEditComponent,
    MemberMatchListComponent,
    MemberMessageComponent,
    MemberConditionEditComponent,
    MemberPhotoEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MemberRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    FileUploadModule,
    TabsModule.forRoot()
  ],
  exports: [
    MemberCardComponent
  ]
})
export class MemberModule { }
