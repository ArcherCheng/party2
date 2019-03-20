import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteAfterComponent } from './note-after/note-after.component';
import { NoteMeetComponent } from './note-meet/note-meet.component';
import { NoteBeforeComponent } from './note-before/note-before.component';

@NgModule({
  declarations: [
    NoteAfterComponent,
    NoteMeetComponent,
    NoteBeforeComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
