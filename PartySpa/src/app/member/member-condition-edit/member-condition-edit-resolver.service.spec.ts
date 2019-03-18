import { TestBed } from '@angular/core/testing';

import { MemberConditionEditResolverService } from './member-condition-edit-resolver.service';

describe('MemberConditionEditResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberConditionEditResolverService = TestBed.get(MemberConditionEditResolverService);
    expect(service).toBeTruthy();
  });
});
