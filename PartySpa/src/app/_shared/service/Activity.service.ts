import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // 使用者點擊參加報名活動
  sendActivityOrder(userId: number, partyId: number) {
    return this.http.post(this.baseUrl + 'activity/member/' + userId + '/party/' + partyId + '/sendactivityorder', {});
  }

  getActivityMemberList(userId: number, partyId: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'activity/member/' + userId + '/party/' + partyId + '/memberList', {});
  }

  sendActivityLike(userId: number, partyId: number, likeId: number) {
    return this.http.post(this.baseUrl + 'activity/member/' + userId + '/party/' + partyId + '/like/' + likeId, {});
  }

  getActivityLikeList(userId: number, partyId: number, isMyLike: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'activity/member/' + userId + '/party/' + partyId + '/likeList/' + isMyLike, {});
  }



}
