import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from 'src/app/_shared/interface/User';
import { Observable, EMPTY } from 'rxjs';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MatchDetailResolverService implements Resolve<User> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.get(route.params.userId).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );

  }

}
