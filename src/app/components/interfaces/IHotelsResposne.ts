import {IHotel} from './IHotel';

export interface IHotelResponse {
  error?: string;
  error_description?: string;
  message?: string;
  status?: string;
  results?: IHotel[];
}
