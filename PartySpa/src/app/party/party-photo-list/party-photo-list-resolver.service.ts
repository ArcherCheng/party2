import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PartyPhoto } from 'src/app/_shared/interface/party-photo';
import { PartyService } from 'src/app/_shared/service/party.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyPhotoListResolverService implements Resolve<PartyPhoto[]> {
  pageNumber = 1;
  pageSize = environment.pageSize;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private partyService: PartyService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartyPhoto[]> {
    // alert('PartyPhotoListResolverService');
    return this.partyService.getPartyPhotoList(route.params.partyId).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }

}
