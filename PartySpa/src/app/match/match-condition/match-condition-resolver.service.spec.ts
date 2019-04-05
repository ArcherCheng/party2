import { TestBed } from '@angular/core/testing';

import { MatchConditionResolverService } from './match-condition-resolver.service';

describe('MatchConditionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchConditionResolverService = TestBed.get(MatchConditionResolverService);
    expect(service).toBeTruthy();
  });
});
