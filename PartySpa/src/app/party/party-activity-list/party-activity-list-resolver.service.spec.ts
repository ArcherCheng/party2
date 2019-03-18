import { TestBed } from '@angular/core/testing';

import { PartyActivityListResolverService } from './party-activity-list-resolver.service';

describe('PartyActivityListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyActivityListResolverService = TestBed.get(PartyActivityListResolverService);
    expect(service).toBeTruthy();
  });
});
