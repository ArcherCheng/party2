import { TestBed } from '@angular/core/testing';

import { CheckboxValuesPosterService } from './checkbox-values-poster.service';

describe('CheckboxValuesPosterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckboxValuesPosterService = TestBed.get(CheckboxValuesPosterService);
    expect(service).toBeTruthy();
  });
});
