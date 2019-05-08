import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginUser } from '../interface/loginUser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + '/auth';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: LoginUser;
  mainPhotoUrl = new BehaviorSubject<string>('src/assets/user.png');
  currentPhotoUrl = this.mainPhotoUrl.asObservable();

  constructor(
     private http: HttpClient
    ) { }

  // login(model: any) {
  //   return this.http.post(this.baseUrl + 'login', model).pipe(
  //     map((response: any) => {
  //       const res = response;
  //       if (res) {
  //         localStorage.setItem('token', res.token);
  //         localStorage.setItem('user', JSON.stringify(res.user));
  //         this.currentUser = res.user;
  //         this.decodedToken = this.jwtHelper.decodeToken(res.token);
  //         this.changeUserPhoto(this.currentUser.mainPhotoUrl);
  //       }
  //     })
  //   );
  // }

  logout() {
    this.decodedToken = null;
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLogin(): boolean {
    const token = localStorage.getItem('token');
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    // if (this.decodedToken === undefined && isTokenExpired === false) {
    //   this.decodedToken = this.jwtHelper.decodeToken(token);
    //   const user = localStorage.getItem('user');
    //   this.currentUser = JSON.parse(user);
    //   this.changeUserPhoto(this.currentUser.mainPhotoUrl);
    // }
    return !isTokenExpired;
  }

  changeUserPhoto(photoUrl: string) {
    this.mainPhotoUrl.next(photoUrl);
  }

}
