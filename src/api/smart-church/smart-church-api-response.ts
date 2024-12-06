export interface ChurchResponse {
  id: number | null;
  uuid: string | null;
  ownerId: number | null;
  name: string;
  address: string;
  addressDetail: string | null;
  latitude: number | null;
  longitude: number | null;
  tel: string | null;
}

export type ChurchRequest = {
  name: string;
  address: string;
  addressDetail: string | null;
  latitude: number | null;
  longitude: number | null;
  tel: string | null;
  ownerId: number | null;
};

export type ServiceType = "SERVICE" | "CLASS";
export interface Service {
  type: ServiceType;
  items: { title: string; time: string; location: string }[];
}

export interface Staff {
  name: string;
  role: string;
  description: string | null;
  department: string | null;
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

export interface GalleryPhoto {
  imageUrl: string;
  description: string;
}

export interface ChurchBanner {
  imageUrl: string;
  title: string;
  description: string;
}

export type ChurchVideoType = "YOUTUBE";

export interface ChurchVideo {
  type: ChurchVideoType;
  url: string;
}

export interface ChurchDepartment {
  name: string;
  description: string;
}

export interface ChurchMainInformation {
  churchId: number;
  welcome: string;
  service: Service[];
  departments: ChurchDepartment[];
  staffGroup: StaffGroup[];
  location: Location;
  gallery: GalleryPhoto[];
  banner: ChurchBanner[];
  vedio: ChurchVideo[];
}
