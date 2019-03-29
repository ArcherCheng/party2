import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormComponent } from '../_shared/dynamic-form/container/dynamic-form/dynamic-form.component';
import { CheckboxFromReactiveComponent } from './checkbox-from-reactive/checkbox-from-reactive.component';
import { CheckboxFromTemplateComponent } from './checkbox-from-template/checkbox-from-template.component';

const routes: Routes = [
  {
    path: 'dynamic-form',
    component: DynamicFormComponent,
  },
  {
    path: 'checkbox-form-reactive',
    component: CheckboxFromReactiveComponent,
  },
  {
    path: 'checkbox-form-template',
    component: CheckboxFromTemplateComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
