import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Component({
  selector: 'app-note-before',
  templateUrl: './note-before.component.html',
  styleUrls: ['./note-before.component.css']
})
export class NoteBeforeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.setCurrentTitle('行前須知');

  }

}
