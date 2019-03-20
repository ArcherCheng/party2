import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteAfterComponent } from './note-after/note-after.component';
import { NoteBeforeComponent } from './note-before/note-before.component';
import { NoteMeetComponent } from './note-meet/note-meet.component';

const routes: Routes = [
  { path: 'before', component: NoteBeforeComponent },
  { path: 'meet', component: NoteMeetComponent },
  { path: 'after', component: NoteAfterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
