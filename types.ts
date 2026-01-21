
export enum PresaleStatus {
  Applied = 'Applied',
  NotApplied = 'NotApplied',
  Won = 'Won',
  Unknown = 'Unknown'
}

export enum AirTicketStatus {
  Bought = 'Bought',
  NotBought = 'NotBought',
  Unknown = 'Unknown'
}

export enum BuyMethod {
  Daishua = '代刷',
  BuySelf = 'BuySelf',
  None = 'None'
}

export interface AttendeeStatus {
  name: string;
  wantToGo: boolean;
  buyMethod: BuyMethod;
  orderedDaishua: boolean;
  appliedPresale: boolean;
  gotAirTicket: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CityData {
  id: string;
  city: string;
  country: string;
  region: 'Asia' | 'Europe' | 'North America' | 'Oceania';
  date: string | null;
  venueName: string;
  hasAccommodationBooked: boolean;
  attendees: AttendeeStatus[];
  presaleStatus: PresaleStatus;
  airTicketStatus: AirTicketStatus;
  recommendedAirports: string[];
  coordinates: Coordinates;
  status: 'Confirmed' | 'TBC';
}

export interface TransportOption {
  mode: 'flight' | 'train' | 'metro' | 'bus' | 'walk';
  description: string;
  duration?: string;
}

export interface TourFilters {
  appliedPresaleOnly: boolean;
  missingAirTicketOnly: boolean;
  regions: string[];
}
