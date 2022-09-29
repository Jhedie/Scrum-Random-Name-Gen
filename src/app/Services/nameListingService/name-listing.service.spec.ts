import { TestBed } from '@angular/core/testing';

import { NameListingService } from './name-listing.service';

describe('NameListingService', () => {
  let service: NameListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
