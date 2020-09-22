import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {HereApiService} from '../../services/here-api.service';
import {IHotel} from '../interfaces/IHotel';
import {debounce} from 'lodash';
import {environment} from '../../../environments/environment';
import {IPosition} from '../interfaces/IPosition';
import {DOCUMENT} from '@angular/common';
import {ActiveHotelService} from '../../services/active-hotel.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [HereApiService]
})
export class MapComponent implements OnInit, OnDestroy {

  public mapLat = environment.initialLatitude;
  public mapLng =  environment.initialLongitude;
  public hotels: IHotel[] = [];
  public activeHotel: IHotel;
  public subscriptions: Subscription[] = [];

  constructor(
    private hereService: HereApiService,
    private activeHotelService: ActiveHotelService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.debouncedLoadHotels = debounce(this.debouncedLoadHotels, 200)
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activeHotelService.activeHotel.subscribe( hotel => {
      this.activeHotel= hotel;
    }));
    this.subscriptions.push(this.activeHotelService.mapCenterCords.subscribe( position => {
      if (position?.lat){
        this.mapLat= position.lat;
        this.mapLng= position.lng;
      }
    }));
    this.activeHotelService.setMapCenter({ lat: environment.initialLatitude, lng: environment.initialLongitude});
    this.loadInitialHotels();
  }

  ngOnDestroy(): void {
    /* unsubscribe from all subscriptions */
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  loadHotels(lat:number, lng:number): void {
    this.hereService.getHotels(lat, lng).subscribe( data => {
      if(data?.results) {
        /* show only hotels with position and add new unique hotels */
        const newHotels: IHotel[] = data.results.filter( hotel => !!hotel.position);
        if (newHotels.length > 0) {
          const newUniqueHotels =  newHotels.reduce( (acc, newHotel) => {
            const exist = this.hotels.find( hotel => hotel.id === newHotel.id);
            if (!exist) {
              acc.push(newHotel);
            }
            return acc;
          },[]);

          this.hotels = [...this.hotels, ...newUniqueHotels];
        }
      }
    })
  }

  /**
   * Load new hotels near user/default cords location
   */
  async loadInitialHotels() {
    const res = await this.getLocation();
    if (res) {
      this.activeHotelService.setMapCenter(res);
      this.loadHotels(res.lat, res.lng);
    } else {
      this.loadHotels(this.mapLat, this.mapLng);
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
   * Get user location to set as initial for the map center
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
    if (this.activeHotelService.activeHotel) {
      if (this.activeHotel?.position[0] === position[0] && this.activeHotel?.position[1] === position[1]) {
        isActive = true;
      }
    }
    return isActive
  }

  /**
   * OnMarkerClick -set active hotel
   */
  clickedMarker(hotel: IHotel): void {
    this.activeHotelService.setActiveHotel(hotel);

    /* scroll into view the card that was check on the map */
    document.getElementById(hotel.id).scrollIntoView({ behavior: 'smooth', inline: 'start'});
  }

}
