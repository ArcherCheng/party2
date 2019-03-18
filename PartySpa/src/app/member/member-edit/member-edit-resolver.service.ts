import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/_shared/service/user.service';
import { User } from 'src/app/_shared/interface/User';
import { AuthService } from 'src/app/_shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberEditResolverService implements Resolve<User> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getEdit(this.authService.decodedToken.nameid).pipe(
        catchError(error => {
            this.alertify.error(error);
            this.router.navigate(['/home']);
            return EMPTY;
        })
    );
  }



}
