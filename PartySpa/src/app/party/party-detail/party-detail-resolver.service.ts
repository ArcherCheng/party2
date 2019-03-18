import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PartyService } from 'src/app/_shared/service/party.service';
import { Observable, EMPTY } from 'rxjs';
import { Party } from 'src/app/_shared/interface/party';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyDetailResolverService implements Resolve<Party> {

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private partyService: PartyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Party> {
    return this.partyService.get(route.params.id).pipe(
        catchError(error => {
            this.alertify.error(error.error);
            this.router.navigate(['/home']);
            return EMPTY;
        })
    );
  }

}
