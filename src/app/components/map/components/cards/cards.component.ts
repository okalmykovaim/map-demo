import {Component, Input} from '@angular/core';
import {IHotel} from '../../../interfaces/IHotel';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  @Input() hotels: IHotel[];
  @Input() activeHotel: IHotel;

  constructor() { }

}
