import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { User } from 'src/app/_shared/interface/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  photoUrl: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

}
