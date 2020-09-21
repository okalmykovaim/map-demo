import { Component } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent {

  public showMenu = false;

  constructor() { }

  /** Open/hide left menu */
  onBurgerClick() {
    this.showMenu = !this.showMenu;
  }

}
