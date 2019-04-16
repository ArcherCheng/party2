import { TestBed } from '@angular/core/testing';

import { MemberPayEditResolverService } from './member-pay-edit-resolver.service';

describe('MemberPayEditResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberPayEditResolverService = TestBed.get(MemberPayEditResolverService);
    expect(service).toBeTruthy();
  });
});
