import { TestBed } from '@angular/core/testing';

import { ActivityAuditResolverService } from './activity-audit-resolver.service';

describe('ActivityAuditResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityAuditResolverService = TestBed.get(ActivityAuditResolverService);
    expect(service).toBeTruthy();
  });
});
