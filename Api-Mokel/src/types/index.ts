export interface LocationInput {
  name: string;
  province?: string;
}

export interface RestaurantInput {
  name: string;
  openingTime: string;
  closingTime: string;
  address: string;
  locationId: string;
}
