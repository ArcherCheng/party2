import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Party } from 'src/app/_shared/interface/party';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from 'src/app/_shared/service/user.service';
import { PaginatedResult } from 'src/app/_shared/interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class MemberPartyListResolverService implements Resolve<PaginatedResult<Party[]>> {
  pageNumber = 1;
  pageSize = environment.pageSize;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getMyPartyList(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize)
    .pipe(
      // tap(data => console.log(data)),
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}
