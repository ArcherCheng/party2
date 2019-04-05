import { Injectable } from '@angular/core';
import { PaginatedResult } from 'src/app/_shared/interface/pagination';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from 'src/app/_shared/interface/User';
import { AdminService } from 'src/app/_shared/service/admin.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberListResolverService implements Resolve<PaginatedResult<User[]>> {
  pageNumber = 1;
  pageSize = environment.pageSize;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.adminService.getMemberList(this.pageNumber, this.pageSize).pipe(
      // tap(data => console.log(data)),
      catchError(error => {
        // catchError(this.authService.handleError('adminService.getMemberList', []));
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}
