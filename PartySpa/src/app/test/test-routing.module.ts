import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormComponent } from '../_shared/dynamic-form/container/dynamic-form/dynamic-form.component';
import { CheckboxFromReactiveComponent } from './checkbox-from-reactive/checkbox-from-reactive.component';
import { CheckboxFromTemplateComponent } from './checkbox-from-template/checkbox-from-template.component';

const routes: Routes = [
  {
    path: 'dynamic',
    component: DynamicFormComponent,
  },
  {
    path: 'form1',
    component: CheckboxFromReactiveComponent,
  },
  {
    path: 'form2',
    component: CheckboxFromTemplateComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
