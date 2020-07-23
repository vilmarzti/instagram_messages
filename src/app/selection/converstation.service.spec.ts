import { TestBed } from '@angular/core/testing';

import { ConverstationService } from './converstation.service';

describe('ConverstationService', () => {
  let service: ConverstationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverstationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
