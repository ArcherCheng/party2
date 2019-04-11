import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/_shared/interface/User';
import { ActivityService } from 'src/app/_shared/service/Activity.service';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolverService implements Resolve<User> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private activityService: ActivityService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.activityService.getMember(
      this.authService.decodedToken.nameid,
      // route.params.userId,
      route.params.partyId,
      route.params.id).pipe(
        catchError(error => {
            this.alertify.error(error.error);
            this.router.navigate(['/home']);
            return EMPTY;
        })
    );
  }



}
