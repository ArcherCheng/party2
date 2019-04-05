import { TestBed } from '@angular/core/testing';

import { MatchDetailResolverService } from './match-detail-resolver.service';

describe('MatchDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchDetailResolverService = TestBed.get(MatchDetailResolverService);
    expect(service).toBeTruthy();
  });
});
