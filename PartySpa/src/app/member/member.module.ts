import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { MemberRoutingModule } from './member-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberMatchListComponent } from './member-match-list/member-match-list.component';
import { MemberConditionEditComponent } from './member-condition-edit/member-condition-edit.component';
import { MemberPhotoEditComponent } from './member-photo-edit/member-photo-edit.component';
import { Test005Component } from './test005/test005.component';

@NgModule({
  declarations: [
    MemberEditComponent,
    MemberMatchListComponent,
    MemberConditionEditComponent,
    MemberPhotoEditComponent,
    Test005Component
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
  ]
})
export class MemberModule { }
