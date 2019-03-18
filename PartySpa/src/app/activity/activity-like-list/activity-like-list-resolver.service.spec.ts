import { TestBed } from '@angular/core/testing';

import { ActivityLikeListResolverService } from './activity-like-list-resolver.service';

describe('ActivityLikeListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityLikeListResolverService = TestBed.get(ActivityLikeListResolverService);
    expect(service).toBeTruthy();
  });
});
