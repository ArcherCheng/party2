import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { UserCondition } from 'src/app/_shared/interface/UserCondition';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { UserService } from 'src/app/_shared/service/user.service';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberConditionResolverService implements Resolve<UserCondition>  {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<UserCondition> {
    return this.userService.getCondition(this.authService.decodedToken.nameid).pipe(
        catchError(error => {
            this.alertify.error(error);
            this.router.navigate(['/home']);
            return EMPTY;
        })
    );
  }

}
