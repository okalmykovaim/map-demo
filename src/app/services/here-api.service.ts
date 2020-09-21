import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {IHotelResponse} from '../components/interfaces/IHotelsResposne';

@Injectable()
export class HereApiService {

  constructor(
    private http: HttpClient
  ) { }

  getHotels = (lat: number, lon: number) : Observable<IHotelResponse> => {
    return this.http.get(
      `https://places.ls.hereapi.com/places/v1/autosuggest?at=${lat},${lon}&q=hotel&apiKey=${environment.hereApiKey}`
    )
      .pipe(
        catchError((err) => {
          console.log('GET HOTELS ERROR', err);
          return throwError(err);
        }
      )
    )
  }
}
