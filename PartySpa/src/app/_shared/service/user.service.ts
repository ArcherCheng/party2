import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { Photo } from '../interface/photo';
import { PaginatedResult, Pagination } from '../interface/pagination';
import { MyMessage } from '../interface/myMessage';
import { map } from 'rxjs/operators';
import { UserCondition } from '../interface/UserCondition';
import { Party } from '../interface/party';
import { Activity } from '../interface/activity';

// 改為採用 @auth0/angular2-jwt
// const httpOptions = {
//  headers: new HttpHeaders({
//    'Authorization': 'Bearer ' + localStorage.getItem('token')
//  })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getMember(userId: number): Observable<User> {
    // alert(this.baseUrl + 'member/' + userId + '/memberDetail')
    return this.http.get<User>(this.baseUrl + 'member/' + userId + '/memberDetail');  // , httpOptions
  }

  // getMember(userId: number, partyId: number , id: number): Observable<User> {
  //   return this.http.get<User>(this.baseUrl + 'activity/myId/' + userId + '/party/' + partyId
  //   + '/member/' + id + '/detail');  // , httpOptions
  // }

  getMyCondition(userId: number): Observable<UserCondition> {
    return this.http.get<UserCondition>(this.baseUrl + 'member/' + userId + '/MyCondition');  // , httpOptions
  }

  getPhotos(userId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.baseUrl + 'member/' + userId + '/Photos');  // , httpOptions
  }

   getMyPartyPay(userId: number, partyId: number): Observable<Activity> {
    return this.http.get<Activity>(this.baseUrl + 'member/' + userId + '/MyPartyPay/' + partyId);
  }

  updateMyPartyPay(userId: number, partyId: number, data: Activity) {
    console.log(data);
    return this.http.post(this.baseUrl + 'member/' + userId + '/MyPartyPay/' + partyId, data);
  }

  getMyMatchList(userId, page?, itemsPerPage? ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<User[]>(this.baseUrl + 'member/' + userId + '/myMatchList', {observe: 'response', params})
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

  getMyPartyList(userId, page?, itemsPerPage?): Observable<PaginatedResult<Party[]>> {
    const paginatedResult: PaginatedResult<Party[]> = new PaginatedResult<Party[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Party[]>(this.baseUrl + 'member/' + userId + '/myPartyList', {observe: 'response', params})
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

  getMyEdit(userId): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'member/' + userId + '/myEdit');  // , httpOptions
  }

  updateMember(userId: number, member: User) {
    return this.http.post(this.baseUrl + 'member/' + userId + '/myEditUpdate', member);
  }

  updateCondition(userId: number, data: UserCondition) {
    // console.log(userId, data);
    return this.http.post(this.baseUrl + 'member/' + userId + '/MyCondition/Update', data);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'member/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'member/' + userId + '/photos/' + id );
  }

  getAllMessages(userId: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<MyMessage[]> = new PaginatedResult<MyMessage[]>();

    let params = new HttpParams();
    params = params.append('messageContainer', messageContainer);
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<MyMessage[]>(this.baseUrl + 'message/myId/' + userId + '/getAllMessages', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  getMessageThread(userId: number, recipientId: number) {
    return this.http.get<MyMessage[]>(this.baseUrl + 'message/myId/' + userId + '/thread/' + recipientId);
  }

  sendMessage(userId: number, messape: MyMessage) {
    return this.http.post(this.baseUrl + 'message/myId/' + userId , messape);
  }

  deleteMessage(userId: number, messageId: number ) {
    return this.http.post(this.baseUrl + 'message/myId/' + userId + '/delete/' + messageId, {});
  }

  markAsRead(userId: number, messageId: number) {
    return this.http.post(this.baseUrl + 'message/myId/' + userId + '/markRead/' + messageId , {}).subscribe();
  }

  // getActivityUserList(userId: number, partyId: number): Observable<User[]> {
  //   return this.http.get<User[]>(this.baseUrl + 'member/' + userId + '/activity/' + partyId + '/memberList', {});
  // }

  // getActivityUserLikeList(userId: number, partyId: number, isLiker: number): Observable<User[]> {
  //   return this.http.get<User[]>(this.baseUrl + 'member/' + userId + '/activity/' + partyId + '/likeList/' + isLiker, {});
  // }

  // sendPartyApply(userId, partyId) {
  //   return this.http.post(this.baseUrl + 'member/' + userId + '/party/' + partyId, {});
  // }

  // sendActivityLike(userId: number, partyId: number, likeId: number) {
  //   return this.http.post(this.baseUrl + 'member/' + userId + '/activity/' + partyId + '/like/' + likeId, {});
  // }

}
