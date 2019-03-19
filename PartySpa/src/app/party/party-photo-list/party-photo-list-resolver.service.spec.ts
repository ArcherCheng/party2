import { TestBed } from '@angular/core/testing';

import { PartyPhotoListResolverService } from './party-photo-list-resolver.service';

describe('PartyPhotoListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyPhotoListResolverService = TestBed.get(PartyPhotoListResolverService);
    expect(service).toBeTruthy();
  });
});
