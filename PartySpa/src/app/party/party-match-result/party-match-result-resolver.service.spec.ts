import { TestBed } from '@angular/core/testing';

import { PartyMatchResultResolverService } from './party-match-result-resolver.service';

describe('PartyMatchResultResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyMatchResultResolverService = TestBed.get(PartyMatchResultResolverService);
    expect(service).toBeTruthy();
  });
});
