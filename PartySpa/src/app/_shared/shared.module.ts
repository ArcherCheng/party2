import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { JwtModule } from '@auth0/angular-jwt';

import { EducationPipe } from 'src/app/_shared/enum/education.pipe';
import { MarryPipe } from 'src/app/_shared/enum/marry.pipe';
import { SexPipe } from 'src/app/_shared/enum/sex.pipe';

import { PartyCardComponent } from './component/party-card/party-card.component';
import { MarryConditionPipe } from './enum/marry-condition.pipe';
import { MemberCardComponent } from './component/member-card/member-card.component';

// export function tokenGetter() {
//   return localStorage.getItem('token');
// }

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
    // JwtModule.forRoot({
    //   config: {
    //     // tslint:disable-next-line:object-literal-shorthand
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['localhost:5000'],
    //     blacklistedRoutes: ['localhost:5000/api/auth']
    //   }
    // })
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
    // JwtModule
  ]
})
export class SharedModule { }
