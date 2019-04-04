import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { MarryConditionPipe } from './pipe/marry-condition.pipe';
import { MarryPipe } from 'src/app/_shared/pipe/marry.pipe';
import { EducationPipe } from 'src/app/_shared/pipe/education.pipe';
import { SexPipe } from 'src/app/_shared/pipe/sex.pipe';

import { PartyCardComponent } from './component/party-card/party-card.component';
import { MemberCardComponent } from './component/member-card/member-card.component';

@NgModule({
  declarations: [
    PartyCardComponent,
    MemberCardComponent,
    EducationPipe,
    SexPipe,
    MarryPipe,
    MarryConditionPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
  ],
  exports: [
    PartyCardComponent,
    MemberCardComponent,

    EducationPipe,
    MarryPipe,
    MarryConditionPipe,
    SexPipe,

    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxGalleryModule,
    FileUploadModule,
    TabsModule,
  ]
})
export class SharedModule { }
