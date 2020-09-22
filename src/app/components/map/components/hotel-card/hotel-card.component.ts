import {Component, Input} from '@angular/core';
import {IHotel} from '../../../interfaces/IHotel';
import {ActiveHotelService} from '../../../../services/active-hotel.service';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent{

  @Input() hotel: IHotel;

  constructor(
    private activeHotelService: ActiveHotelService,
  ) { }

  /**
   * Convert m to km
   */
  transformDistance(dist: number): string {
    return (dist/1000).toFixed(1);
  }

  /**
   * Change an active hotel
   */
  onTitleClick(hotel: IHotel) {
    this.activeHotelService.setActiveHotelAndMapCenter(hotel, {lat: hotel.position[0], lng: hotel.position[1]});
  }

  /**
   * If title is too long cut it
   */
  limitTitle(title: string){
    if (title.length > 33 ) {
      return title.slice(0, 33)+'...';
    }
    return title;
  }

}
