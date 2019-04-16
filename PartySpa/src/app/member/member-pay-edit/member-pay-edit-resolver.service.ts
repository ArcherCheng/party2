import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { Activity } from 'src/app/_shared/interface/activity';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberPayEditResolverService implements Resolve<Activity> {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getMyPartyPay(this.authService.decodedToken.nameid, route.params.partyId).pipe(
      // tap(data => console.log(data)),
      catchError(error => {
        this.alertify.error(error);
        this.router.navigate(['/member/myPartyList']);
        return EMPTY;
      })
    );
  }
}
