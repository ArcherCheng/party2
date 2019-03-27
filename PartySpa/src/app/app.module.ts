import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';
import { CollapseModule } from 'ngx-bootstrap/collapse';

// import { SharedAngularMaterialModule } from './_shared/shared-angular-material/shared-angular-material.module';
import { SharedModule } from './_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DynamicFormModule } from './_shared/dynamic-form/dynamic-form.module';
import { TestDynamicFormComponent } from './test-dynamic-form/test-dynamic-form.component';
// import { NavComponent } from './_shared/nav/nav.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestDynamicFormComponent,
    // NavComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // RouterModule,
    // HttpClientModule,
    // SharedAngularMaterialModule,
    SharedModule,
    DynamicFormModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
