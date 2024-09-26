export interface ChurchResponse {
  email: string;
  id: number;
  name: string;
  address: string;
  tel: string;
  logoImageUrl: string;
  footerLogoImageUrl: string;
}

export type ServiceType = "SERVICE" | "CLASS";
export interface Service {
  type: ServiceType;
  items: { title: string; time: string; location: string }[];
}

export interface Staff {
  name: string;
  role: string;
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
  churchId: number;
  welcome: string;
  service: Service[];
  staffGroup: StaffGroup[];
  location: Location;
}
