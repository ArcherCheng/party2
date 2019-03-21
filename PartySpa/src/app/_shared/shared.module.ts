import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EducationPipe } from 'src/app/_shared/pipe/education.pipe';
import { MarryPipe } from 'src/app/_shared/pipe/marry.pipe';
import { SexPipe } from 'src/app/_shared/pipe/sex.pipe';
import { MarryConditionPipe } from './pipe/marry-condition.pipe';

import { PartyCardComponent } from './component/party-card/party-card.component';
import { MemberCardComponent } from './component/member-card/member-card.component';

@NgModule({
  declarations: [
    PartyCardComponent,
    MemberCardComponent,
    EducationPipe,
    MarryPipe,
    SexPipe,
    MarryConditionPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    PartyCardComponent,
    MemberCardComponent,

    EducationPipe,
    MarryPipe,
    MarryConditionPipe,
    SexPipe,
  ]
})
export class SharedModule { }
