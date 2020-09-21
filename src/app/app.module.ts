import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { MainLogoComponent } from './components/header/components/main-logo/main-logo.component';
import { BurgerMenuComponent } from './components/header/components/burger-menu/burger-menu.component';
import {environment} from '../environments/environment';
import {AgmCoreModule} from '@agm/core';
import {HereApiService} from './services/here-api.service';
import {HttpClientModule} from "@angular/common/http";
import { HotelCardComponent } from './components/map/components/hotel-card/hotel-card.component';
import { CardsComponent } from './components/map/components/cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MapComponent,
    MainLogoComponent,
    BurgerMenuComponent,
    HotelCardComponent,
    CardsComponent
  ],
  imports: [
    AgmCoreModule.forRoot({apiKey: environment.googleMapsApiKey}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HereApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
