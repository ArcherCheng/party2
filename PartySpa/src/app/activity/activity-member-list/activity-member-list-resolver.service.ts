import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/_shared/interface/user';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { ActivityService } from 'src/app/_shared/service/Activity.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityMemberListResolverService implements Resolve<User[]> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private activityService: ActivityService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    // alert('ActivityMemberListResolverService');
    return this.activityService.getActivityMemberList(
      this.authService.decodedToken.nameid,
      route.params.partyId
    ).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/party/activity']);
        return of(null);
      })
    );
  }
}
