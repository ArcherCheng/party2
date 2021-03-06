import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from 'src/app/_shared/interface/pagination';
import { Party } from 'src/app/_shared/interface/party';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../interface/User';
import { Observable } from 'rxjs';
import { Activity } from '../interface/activity';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // party list ,取得活動列表
  getPartyList(page?, itemPerPage?) {
    const paginatedResult: PaginatedResult<Party[]> = new PaginatedResult<Party[]>();
    let params = new HttpParams();
    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
    }

    return this.http.get<Party[]>(this.baseUrl + 'admin/partylist', { observe: 'response', params })
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

  partyAdd(data: Party) {
    return this.http.post(this.baseUrl + 'admin/partyAdd', data);
  }

  getParty(partyId: number): Observable<Party> {
    return this.http.get<Party>(this.baseUrl + 'admin/party/' + partyId);
  }

  getActivityAuditList(partyId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl + 'admin/party/activity/' + partyId + '/audit');
  }

  // party list ,取得活動列表
  getMemberList(page?, itemPerPage?) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();
    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
    }

    return this.http.get<User[]>(this.baseUrl + 'admin/memberlist', { observe: 'response', params })
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
