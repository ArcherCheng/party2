/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartyDetailResolverService } from './party-detail-resolver.service';

describe('Service: PartyDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyDetailResolverService]
    });
  });

  it('should ...', inject([PartyDetailResolverService], (service: PartyDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
