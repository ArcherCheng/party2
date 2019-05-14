import { TestBed } from '@angular/core/testing';

import { MyFriendsResolverService } from './my-friends-resolver.service';

describe('MyFriendsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyFriendsResolverService = TestBed.get(MyFriendsResolverService);
    expect(service).toBeTruthy();
  });
});
