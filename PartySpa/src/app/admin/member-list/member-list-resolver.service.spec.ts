import { TestBed } from '@angular/core/testing';

import { MemberListResolverService } from './member-list-resolver.service';

describe('MemberListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberListResolverService = TestBed.get(MemberListResolverService);
    expect(service).toBeTruthy();
  });
});
