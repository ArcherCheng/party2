import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { DynamicFormModule } from '../_shared/dynamic-form/dynamic-form.module';
import { MatchRoutingModule } from './match-routing.module';

import { MatchListComponent } from './match-list/match-list.component';
import { MatchConditionComponent } from './match-condition/match-condition.component';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MatchListComponent,
    MatchConditionComponent,
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
