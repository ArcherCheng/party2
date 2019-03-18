import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PartyService } from 'src/app/_shared/service/party.service';
import { Party } from 'src/app/_shared/interface/party';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyActivityListResolverService implements Resolve<Party[]> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private partyService: PartyService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Party[]> {
    return this.partyService.getActivityList().pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }

}
