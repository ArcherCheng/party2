import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Activity } from 'src/app/_shared/interface/activity';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AdminService } from 'src/app/_shared/service/admin.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityAuditResolverService implements Resolve<Activity[]> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService,
    private adminService: AdminService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Activity[]> {
    return this.adminService.getActivityAuditList(route.params.partyId).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/admin/party']);
        return EMPTY;
      })
    );
  }

}
