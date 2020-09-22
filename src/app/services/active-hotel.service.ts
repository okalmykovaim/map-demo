import { Injectable } from '@angular/core';
import {IHotel} from "../components/interfaces/IHotel";
import {BehaviorSubject} from 'rxjs';
import {IPosition} from "../components/interfaces/IPosition";

@Injectable({
  providedIn: 'root'
})
export class ActiveHotelService {

  public activeHotel = new BehaviorSubject<IHotel>(null);
  public mapCenterCords = new BehaviorSubject<IPosition>(null);

  constructor() { }

  public setActiveHotel(hotel: IHotel) {
    this.activeHotel.next(hotel);
  }

  public setMapCenter(position: IPosition) {
    this.mapCenterCords.next(position);
  }

  public setActiveHotelAndMapCenter(hotel: IHotel, position: IPosition) {
    this.setMapCenter(position);
    this.setActiveHotel(hotel)
  }
}
