import { TestBed } from '@angular/core/testing';

import { MemberEditResolverService } from './member-edit-resolver.service';

describe('MemberEditResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberEditResolverService = TestBed.get(MemberEditResolverService);
    expect(service).toBeTruthy();
  });
});
