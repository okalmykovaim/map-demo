import { TestBed } from '@angular/core/testing';

import { HereApiService } from './here-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from "../../environments/environment";

describe('HereApiService', () => {
  let service: HereApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HereApiService]
    });
    service = TestBed.inject(HereApiService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHotels - should match the right data', () => {
    service.getHotels(1, 1) .subscribe(res => {
      expect(res.results).toEqual( [] );
    });
    const req = httpTestingController.expectOne(`https://places.ls.hereapi.com/places/v1/autosuggest?at=1,1&q=hotel&apiKey=${environment.hereApiKey}`);
    expect(req.request.method).toEqual('GET');
    req.flush({results: []});
  });
});
