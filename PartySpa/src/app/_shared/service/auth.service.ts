import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// import { User } from '../interface/User';
import { Register } from '../interface/register';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { CheckboxItem } from '../dynamic-form/interface/checkbox-item';
import { LoginUser } from '../interface/loginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: LoginUser;
  mainPhotoUrl = new BehaviorSubject<string>('src/assets/user.png');
  currentPhotoUrl = this.mainPhotoUrl.asObservable();
  currentTitle = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertify: AlertifyService
    ) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const res = response;
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUser = res.user;
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.changeUserPhoto(this.currentUser.mainPhotoUrl);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.alertify.message('登出系統');
    this.router.navigate(['/home']);
  }

  setCurrentTitle(title: string) {
    this.currentTitle.next(title);
  }

  changeUserPhoto(photoUrl: string) {
    this.mainPhotoUrl.next(photoUrl);
  }

  register(user: Register) {
    console.log(user);
    return this.http.post(this.baseUrl + 'register', user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if ( this.decodedToken === undefined && isTokenExpired === false) {
      this.alertify.message('restore token');
      this.decodedToken = this.jwtHelper.decodeToken(token);
      const user = localStorage.getItem('user');
      this.currentUser = JSON.parse(user);
      this.changeUserPhoto(this.currentUser.mainPhotoUrl);
    }
    return !isTokenExpired;
  }

  forgetPassword(myphone: string, myemail: string) {
    return this.http.post(this.baseUrl + 'forgetPassword', {phone: myphone, email: myemail});
  }

  getCheckboxItemList(keyGroup: string): Observable<CheckboxItem[]> {
    return this.http.get<CheckboxItem[]>(this.baseUrl + 'getCheckboxItemList/' + keyGroup);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // this.router.navigate(['/home']);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
