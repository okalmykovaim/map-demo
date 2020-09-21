import {Component, Input, OnInit} from '@angular/core';
import {IHotel} from '../../../interfaces/IHotel';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {

  @Input() hotel: IHotel;

  constructor() { }

  ngOnInit(): void {
  }

  transformDistance(dist: number): string {
    return (dist/1000).toFixed(1);
  }

}
