import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Party } from '../interface/party';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // detail 查詢單筆活動的詳細內容
  get(id: number): Observable<Party> {
    return this.http.get<Party>(this.baseUrl + 'party/' + id);
  }

  // home 首頁用,不做分頁處理,取得近期的活動列表
  getNewList(): Observable<Party[]> {
    return this.http.get<Party[]>(this.baseUrl + 'party');
  }

  // 互動派動,取後近一個月內的活動,會員可互相投票及留言
  getActivityList(): Observable<Party[]> {
    return this.http.get<Party[]>(this.baseUrl + 'party/activity');
  }

  // history list ,取得歷史的活動列表
  getHistoryList(page? , itemPerPage?) {
    const paginatedResult: PaginatedResult<Party[]> = new PaginatedResult<Party[]>();
    let params = new HttpParams();
    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
    }

    return this.http.get<Party[]>(this.baseUrl + 'party/old', { observe: 'response', params})
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

  // 建立新的活動
  create(party: Party) {
    return this.http.post(this.baseUrl + 'party', party);
  }

  // // 使用者點擊參加報名活動
  // sendOrderMemberParty(userId: number, partyId: number) {
  //   return this.http.post(this.baseUrl + 'member/' + userId + '/party/' + partyId + '/sendOrder', {});
  // }

}
