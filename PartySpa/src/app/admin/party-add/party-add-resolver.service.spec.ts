import { TestBed } from '@angular/core/testing';

import { PartyAddResolverService } from './party-add-resolver.service';

describe('PartyAddResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyAddResolverService = TestBed.get(PartyAddResolverService);
    expect(service).toBeTruthy();
  });
});
