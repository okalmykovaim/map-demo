import {Component, Inject, OnInit} from '@angular/core';
import {HereApiService} from '../../services/here-api.service';
import {IHotel} from '../interfaces/IHotel';
import {debounce} from 'lodash';
import {environment} from '../../../environments/environment';
import {IPosition} from '../interfaces/IPosition';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [HereApiService]
})
export class MapComponent implements OnInit {

  public initialLat = environment.initialLatitude;
  public initialLng =  environment.initialLongitude;
  public hotels: IHotel[] = [];
  public activeHotel: IHotel;

  constructor(
    private hereService: HereApiService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.debouncedLoadHotels = debounce(this.debouncedLoadHotels, 300)
  }

  ngOnInit(): void {
    this.loadInitialHotels();
  }

  loadHotels(lat:number, lng:number): void {
    this.hereService.getHotels(lat, lng).subscribe( data => {
      if(data?.results) {
        /* show only hotels with position */
        this.hotels = data.results.filter( hotel => !!hotel.position);
        if (this.hotels.length > 0 ) {
        }
      }
      console.log('this.hotels', this.hotels);
    })
  }

  /**
   * Load new hotels new user/default cords location
   */
  async loadInitialHotels() {
    const res = await this.getLocation();
    if (res) {
      this.initialLat = res.lat;
      this.initialLng = res.lng;
      console.log('getLocation res', res);
      this.loadHotels(res.lat, res.lng);
    } else {
      /* if we can't get user location we load map with initial values from environment file */
      this.loadHotels(this.initialLat, this.initialLng);
    }
  }

  /**
   * Load new hotels array after changing the coordinates of the map center
   */
  onMapCenterChange(e): void {
    this.debouncedLoadHotels(e.lat,e.lng);
  }

  /**
   *  To improve performance debounce loadHotels, uses with map center change
   */
  debouncedLoadHotels(lat: number, lng: number): void {
    this.loadHotels(lat, lng)
  }

  /**
   * Get user location to set as initial for map
   */
  getLocation(): Promise<IPosition> {
    return new Promise(resolve => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }, e => {
          console.log('GET CURRENT POSITION ERROR', e);
          resolve(null);
        });
      } else {
        console.log('NO SUPPORT FOR GEOLOCATION');
        resolve(null);
      }
    });
  }

  /**
   * Check is mapMarker is active
   */
  isActive(position: number[]): boolean {
    let isActive = false;
    if (this.activeHotel) {
      if (this.activeHotel.position[0] === position[0] && this.activeHotel.position[1] === position[1]) {
        isActive = true;
      }
    }
    return isActive
  }

  /**
   * OnMarkerClick -set active hotel
   */
  clickedMarker(hotel: IHotel): void {
    this.activeHotel = hotel;

    /* scroll into view the card that was check on the map */
    document.getElementById(hotel.id).scrollIntoView({ behavior: 'smooth'});
  }

}
