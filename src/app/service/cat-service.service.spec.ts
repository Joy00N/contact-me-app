import { TestBed } from '@angular/core/testing';

import { CatServiceService } from './cat-service.service';

describe('CatServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatServiceService = TestBed.get(CatServiceService);
    expect(service).toBeTruthy();
  });
});
