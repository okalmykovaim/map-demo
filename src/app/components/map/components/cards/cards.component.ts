import {Component, Input, OnInit} from '@angular/core';
import {IHotel} from "../../../interfaces/IHotel";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() hotels: IHotel[];
  @Input() activeHotel: IHotel;

  constructor() { }

  ngOnInit(): void {
  }

  onCardClick(id: string): void {
  }

}
