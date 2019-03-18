import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { User } from 'src/app/_shared/interface/User';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivityService } from 'src/app/_shared/service/Activity.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityLikeListResolverService implements Resolve<User[]> {
  likesParam = 1;
  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private activityService: ActivityService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.activityService.getActivityLikeList(
      this.authService.decodedToken.nameid,
      route.params.partyId,
      this.likesParam
    ).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/party/activity']);
        return EMPTY;
      })
    );
  }

}
