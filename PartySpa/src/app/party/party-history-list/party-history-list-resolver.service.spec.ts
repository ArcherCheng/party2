import { TestBed } from '@angular/core/testing';

import { PartyHistoryListResolverService } from './party-history-list-resolver.service';

describe('PartyHistoryListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyHistoryListResolverService = TestBed.get(PartyHistoryListResolverService);
    expect(service).toBeTruthy();
  });
});
