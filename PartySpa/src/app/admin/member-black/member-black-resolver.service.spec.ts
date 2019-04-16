import { TestBed } from '@angular/core/testing';

import { MemberBlackResolverService } from './member-black-resolver.service';

describe('MemberBlackResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberBlackResolverService = TestBed.get(MemberBlackResolverService);
    expect(service).toBeTruthy();
  });
});
