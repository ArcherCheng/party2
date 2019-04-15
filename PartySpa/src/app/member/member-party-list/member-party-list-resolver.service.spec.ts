import { TestBed } from '@angular/core/testing';

import { MemberPartyListResolverService } from './member-party-list-resolver.service';

describe('MemberPartyListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberPartyListResolverService = TestBed.get(MemberPartyListResolverService);
    expect(service).toBeTruthy();
  });
});
