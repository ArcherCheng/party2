import { TestBed } from '@angular/core/testing';

import { ActivityMemberListResolverService } from './activity-member-list-resolver.service';

describe('ActivityMemberListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityMemberListResolverService = TestBed.get(ActivityMemberListResolverService);
    expect(service).toBeTruthy();
  });
});
