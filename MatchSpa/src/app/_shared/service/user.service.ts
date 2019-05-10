import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { PaginatedResult } from '../interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertify: AlertifyService
    ) { }

  // getUserList(): Observable<User[]> {
  //   return this.http.get<User>(this.baseUrl + 'matchUser/userList');
  // }

  getUserList(page?, itemsPerPage? ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<User[]>(this.baseUrl + 'matchUser/userList', {observe: 'response', params})
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
