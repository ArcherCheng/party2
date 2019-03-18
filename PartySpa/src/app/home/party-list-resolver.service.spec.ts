import { TestBed } from '@angular/core/testing';

import { PartyListResolverService } from './party-list-resolver.service';

describe('PartyListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyListResolverService = TestBed.get(PartyListResolverService);
    expect(service).toBeTruthy();
  });
});
