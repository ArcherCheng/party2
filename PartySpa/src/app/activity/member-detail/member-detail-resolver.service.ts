import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/_shared/service/user.service';
import { User } from 'src/app/_shared/interface/User';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolverService implements Resolve<User> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // alert('MemberDetailResolverService');
    return this.userService.get(route.params.userId).pipe(
        catchError(error => {
            this.alertify.error(error.error);
            this.router.navigate(['/home']);
            return EMPTY;
        })
    );
  }



}
