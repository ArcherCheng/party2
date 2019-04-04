import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PaginatedResult } from 'src/app/_shared/interface/pagination';
import { Party } from 'src/app/_shared/interface/party';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AdminService } from 'src/app/_shared/service/admin.service';

@Injectable({
  providedIn: 'root'
})
export class PartyListResolverService implements Resolve<PaginatedResult<Party[]>> {
  pageNumber = 1;
  pageSize = environment.pageSize;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.adminService.getPartyList(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }

}
