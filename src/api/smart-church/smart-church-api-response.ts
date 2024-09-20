export interface ChurchResponse {
  id: number;
  name: string;
}

export type ServiceType = "SERVICE" | "CLASS";
export interface Service {
  type: ServiceType;
  items: { title: string; time: string }[];
}

export interface Staff {
  name: string;
  description: string | null;
  tel: string | null;
  email: string | null;
  profileImageUrl: string | null;
}
export interface StaffGroup {
  type: string; // pastor, elder, staff ...
  staffs: Staff[];
}

export interface Location {
  lat: number;
  lng: number;
  description: string;
}

export interface ChurchMainInformation {
  id: number;
  welcome: string;
  service: Service[];
  staffGroup: StaffGroup[];
  location: Location;
}
