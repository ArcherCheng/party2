import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { PaginatedResult } from '../interface/pagination';
import { UserCondition } from '../interface/user-condition';
import { UserPhoto } from '../interface/user-photo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserList(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<User[]>(this.baseUrl + 'matchUser/userList', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getUserMatchList(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (this.authService.isLogin()) {
      const userId = +this.authService.decodedToken.nameid;
      return this.http.get<User[]>(this.baseUrl + 'matchUser/userMatchList/' + userId , { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          console.log('getUserMatchList');
          console.log(paginatedResult);

          return paginatedResult;
        })
      );
    } else {
      const condition = this.authService.getUserCondition();
      return this.http.post<User[]>(this.baseUrl + 'matchUser/userMatchList', condition, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
    }

  }


  getMyFriends(userId: number, page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null ) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<User[]>(this.baseUrl + 'matchUser/myFriends/' + userId, {observe: 'response', params} )
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getUserDetail(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'matchUser/userDetail/' + userId);
  }

  getUserPhotos(userId: number): Observable<UserPhoto[]> {
    return this.http.get<UserPhoto[]>(this.baseUrl + 'matchUser/userPhotos/' + userId);
  }

  getUserCondition(userId: number): Observable<UserCondition> {
    return this.http.get<UserCondition>(this.baseUrl + 'matchUser/userCondition/' + userId );
  }

  updateUserCondition(userId: number, data: UserCondition ) {
    return this.http.post(this.baseUrl + 'matchUser/userCondition/update/' + userId , data);
  }

  updateUser(userId: number, data: User ) {
    return this.http.post(this.baseUrl + 'matchUser/user/update/' + userId , data);
  }


}
