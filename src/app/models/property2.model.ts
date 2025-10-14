export interface Property2 {
  id: number;
  name?: string;
  email?: string;
  propertyPostedDate?: string; // ISO date string
  mobileNo?: number;
  postedBy?: string;
  propertyType?: string;
  propertyAdsType?: string; // Rent / Sell / Both / Residential / Commercial
  apartmentName?: string;
  apartmentType?: string;
  bhkType?: string;
  plotArea?: string;
  ownershipType?: string;
  leaseYears?: string;
  builtUpArea?: string;
  carpetArea?: string;
  propertyAge?: string;
  facing?: string;
  floorType?: string;
  floor?: string;
  totalFloor?: string;
  city?: string;
  locality?: string;
  landmark?: string;
  expectedPrice?: number;
  maintenanceCost?: number;
  availableFrom?: string; // ISO
  kitchenType?: string;
  furnishing?: string;
  parking?: string;
  description?: string;
  bathroom?: number;
  balcony?: number;
  waterSupply?: string;
  gym?: string;
  powerBackup?: string;
  gatedSecurity?: string;
  whoWillShowProperty?: string;
  currentPropertyCondition?: string;
  secondaryNumber?: number;
  availableAmenities?: string[];
  // location: lat/lng required for mapping
  latitude: number;
  longitude: number;
  ownerAvailability?: string;
  fromTime?: string;
  toTime?: string;
  priceNegotiable?: boolean;
  currentlyUnder?: boolean;
}
