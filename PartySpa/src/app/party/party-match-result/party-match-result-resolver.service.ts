import { Injectable } from '@angular/core';
import { PartySummary } from 'src/app/_shared/interface/party-summary';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PartyService } from 'src/app/_shared/service/party.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyMatchResultResolverService implements Resolve<PartySummary> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private partyService: PartyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PartySummary> {
    return this.partyService.getPartySummary(route.params.partyId).pipe(
        catchError(error => {
            this.alertify.error(error.error);
            this.router.navigate(['/home']);
            return of(null);
        })
    );
  }

}
