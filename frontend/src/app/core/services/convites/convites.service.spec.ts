import { TestBed } from '@angular/core/testing';

import { ConvitesService } from './convites.service';

describe('ConvitesService', () => {
  let service: ConvitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
