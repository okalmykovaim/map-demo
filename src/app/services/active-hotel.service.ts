import { Injectable } from '@angular/core';
import {IHotel} from "../components/interfaces/IHotel";
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveHotelService {

  public activeHotel = new BehaviorSubject<IHotel>(null);

  constructor() { }

  public setActiveHotel(hotel: IHotel) {
    this.activeHotel.next(hotel);
  }
}
