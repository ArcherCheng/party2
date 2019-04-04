import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchRoutingModule } from './match-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { MemberConditionComponent } from './member-condition/member-condition.component';
import { MatchListComponent } from './match-list/match-list.component';
import { DynamicFormModule } from '../_shared/dynamic-form/dynamic-form.module';
import { MemberDetailComponent } from './member-detail/member-detail.component';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MemberConditionComponent,
    MatchListComponent,
    MemberDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // ReactiveFormsModule,
    DynamicFormModule,
    MatchRoutingModule
  ],
  exports: [
  ]
})
export class MatchModule { }
