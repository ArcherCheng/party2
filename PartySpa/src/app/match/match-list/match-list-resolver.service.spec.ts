import { TestBed } from '@angular/core/testing';

import { MatchListResolverService } from './match-list-resolver.service';

describe('MatchListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchListResolverService = TestBed.get(MatchListResolverService);
    expect(service).toBeTruthy();
  });
});
