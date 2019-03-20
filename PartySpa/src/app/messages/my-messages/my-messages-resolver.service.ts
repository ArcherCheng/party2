import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/_shared/service/user.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { MyMessage } from 'src/app/_shared/interface/myMessage';
import { PaginatedResult } from 'src/app/_shared/interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class MyMessagesResolverService implements Resolve<PaginatedResult<MyMessage[]>> {
  pageNumber = 1;
  pageSize = environment.pageSize;
  messageContainer = 'Unread';

  constructor(
      private userService: UserService,
      private authService: AuthService,
      private router: Router,
      private alertify: AlertifyService
      ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<MyMessage[]>> {
    return this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pageNumber, this.pageSize, this.messageContainer);
      // .pipe(
      //   catchError(error => {
      //     this.alertify.error('讀取資料失敗:' + error);
      //     this.router.navigate(['/home']);
      //     of(null);
      //   })
      // );
  }

}

