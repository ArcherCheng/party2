import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Party } from 'src/app/_shared/interface/party';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { AdminService } from 'src/app/_shared/service/admin.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyAddResolverService implements Resolve<Party> {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService,
    private adminService: AdminService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Party> {
    return this.adminService.getParty(route.params.partyId).pipe(
      catchError(error => {
        this.alertify.error(error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}

//

