import { TestBed } from '@angular/core/testing';

import { ActiveHotelService } from './active-hotel.service';

const hotelMock = {
  category: 'category',
  categoryTitle: 'categoryTitle',
  distance: 1,
  highlightedTitle: 'highlightedTitle',
  highlightedVicinity: 'highlightedVicinity',
  href: 'link',
  id: 'id',
  position: [1, 1],
  resultType: 'resultType',
  title: 'title',
  type: 'type',
  vicinity: 'vicinity',
};

const positionMock = {lat: 1, lng: 1};

describe('ActiveHotelService', () => {
  let service: ActiveHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setMapCenter and return subscribed value', (done: DoneFn) => {
    service.setMapCenter(positionMock);
    service.mapCenterCords.subscribe(value => {
      expect(value.lat).toEqual(positionMock.lat);
      done();
    });
  });

  it('should setActiveHotel and return subscribed value', (done: DoneFn) => {
    service.setActiveHotel(hotelMock);
    service.activeHotel.subscribe(value => {
      expect(value.category).toEqual(hotelMock.category);
      done();
    });
  });

  it('should setActiveHotelAndMapCenter and return subscribed value', (done: DoneFn) => {
    service.setActiveHotelAndMapCenter(hotelMock, positionMock);
    service.activeHotel.subscribe(value => {
      expect(value.category).toEqual(hotelMock.category);
      done();
    });
  });
});
