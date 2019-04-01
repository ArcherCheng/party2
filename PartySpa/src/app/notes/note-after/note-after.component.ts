import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Component({
  selector: 'app-note-after',
  templateUrl: './note-after.component.html',
  styleUrls: ['./note-after.component.css']
})
export class NoteAfterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.setCurrentTitle('約會注意事項');

  }



}
