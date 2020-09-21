import { TestBed } from '@angular/core/testing';

import { ActiveHotelService } from './active-hotel.service';

describe('ActiveHotelService', () => {
  let service: ActiveHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
