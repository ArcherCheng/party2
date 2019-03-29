import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { User } from 'src/app/_shared/interface/User';
import { Observable, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/_shared/interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class MatchListResolverService implements Resolve<PaginatedResult<User[]>> {
  pageNumber = 1;
  pageSize = environment.pageSize;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<User[]>> {
    return this.userService.getMatchList(
      this.authService.decodedToken.nameid, this.pageNumber, this.pageSize
    ).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}
