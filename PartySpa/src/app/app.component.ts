import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_shared/service/auth.service';
import { User } from './_shared/interface/User';
import { wrappedError } from '@angular/core/src/error_handler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  currentTitle = '台北單身派對聯誼會';
  photoUrl: string;
  jwtHelper = new JwtHelperService();
  sidebarMode = true;
  topbarMode = true;
  // @ViewChild('sidebarWrapper') sidebarWrapper: ElementRef;

  constructor(public authService: AuthService) {}

  ngOnInit()  {
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
      this.authService.currentTitle.subscribe(title => this.currentTitle = title);
      const token = localStorage.getItem('token');
      const user: User =  JSON.parse(localStorage.getItem('user'));
      if (token) {
        this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      }
      if (user) {
        this.authService.currentUser = user;
        this.authService.changeUserPhoto(user.photoUrl);
      }
  }

  logout() {
    // this.photoUrl = 'src/assets/user.png';
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // this.authService.decodedToken = null;
    // this.authService.currentUser = null;
    // this.alertify.message('登出系統');
    // this.router.navigate(['/home']);
    this.authService.logout();
    this.photoUrl = '';
  }

  toggleSideBar() {
    this.sidebarMode = !this.sidebarMode;
    const wapperContainer = document.getElementById('wrapper');
    if (this.sidebarMode) {
      wapperContainer.setAttribute('class', 'd-flex');
    } else {
      wapperContainer.setAttribute('class', 'd-flex toggled');
    }
  }

  toggleTopbar() {
    this.topbarMode = !this.topbarMode;
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIn();
  }
}
