import { TestBed } from '@angular/core/testing';

import { PartyVoteResultResolverService } from './party-vote-result-resolver.service';

describe('PartyVoteResultResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyVoteResultResolverService = TestBed.get(PartyVoteResultResolverService);
    expect(service).toBeTruthy();
  });
});
