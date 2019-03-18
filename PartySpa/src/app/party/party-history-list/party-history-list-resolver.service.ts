import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { PartyService } from 'src/app/_shared/service/party.service';
import { Party } from 'src/app/_shared/interface/party';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyHistoryListResolverService implements Resolve<Party[]> {
  pageNumber = 1;
  pageSize = environment.pageSize;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private partyService: PartyService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Party[]> {
    return this.partyService.getHistoryList(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error(error.error);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }

}
