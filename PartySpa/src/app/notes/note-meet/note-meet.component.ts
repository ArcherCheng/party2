import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Component({
  selector: 'app-note-meet',
  templateUrl: './note-meet.component.html',
  styleUrls: ['./note-meet.component.css']
})
export class NoteMeetComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.setCurrentTitle('活動禮儀');

  }


}
