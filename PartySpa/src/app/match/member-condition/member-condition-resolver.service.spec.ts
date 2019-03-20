import { TestBed } from '@angular/core/testing';

import { MemberConditionResolverService } from './member-condition-resolver.service';

describe('MemberConditionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberConditionResolverService = TestBed.get(MemberConditionResolverService);
    expect(service).toBeTruthy();
  });
});
