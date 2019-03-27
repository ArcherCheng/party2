import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { MemberRoutingModule } from './member-routing.module';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TabsModule, PaginationModule } from 'ngx-bootstrap';
// import { NgxGalleryModule } from 'ngx-gallery';
// import { FileUploadModule } from 'ng2-file-upload';

import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberPhotoEditComponent } from './member-photo-edit/member-photo-edit.component';
import { MemberPartyListComponent } from './member-party-list/member-party-list.component';

@NgModule({
  declarations: [
    MemberEditComponent,
    MemberPhotoEditComponent,
    MemberPartyListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MemberRoutingModule,
    // FormsModule
    // ReactiveFormsModule,
    // NgxGalleryModule,
    // PaginationModule,
    // FileUploadModule,
    // TabsModule.forRoot()
  ],
  exports: [
  ]
})
export class MemberModule { }
