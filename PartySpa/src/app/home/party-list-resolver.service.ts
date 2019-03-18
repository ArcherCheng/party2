import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Party } from '../_shared/interface/party';
import { Observable, of, EMPTY } from 'rxjs';
import { AlertifyService } from '../_shared/service/alertify.service';
import { PartyService } from '../_shared/service/party.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyListResolverService implements Resolve<Party[]> {
  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private partyService: PartyService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Party[]> {
    return this.partyService.getNewList().pipe(
      catchError(error => {
        this.alertify.error(error);
        this.router.navigate(['/login/login']);
        return EMPTY;
        })
    );
  }


}
