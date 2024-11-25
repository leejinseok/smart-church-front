import { Op } from "quill/core";

export interface ChurchVideos {
  visible: boolean;
  title: string;
  page: {
    currentPage: number;
    totalPages: number;
    size: number;
    totalElements: number;
    sort: string;
    last: boolean;
    next: boolean;
    data: ChurchVideo[];
  };
}
export interface ChurchVideo {
  url: string;
  order: number;
}

export interface ChurchDepartmentAndMinistry {
  id: number;
  name: string;
  description: string;
}

export interface WorshipServicesAndMeetingsGroup {
  groupName: string;
  items: WorshipServicesAndMeetingsGroupItem[];
}

export interface WorshipServicesAndMeetingsGroupItem {
  name: string;
  time: string;
  location: string;
}

export interface WorshipServicesAndMeetings {
  title: string;
  groups: WorshipServicesAndMeetingsGroup[];
}

export interface ChurchBanner {
  id: number;
  imageUrl: string;
  order: number;
}

export interface ChurchStaff {
  name: string;
  role: string;
  department: string | null;
  description: string | null;
  tel: string | null;
  email: string | null;
  profileImageUrl: string | null;
}

export interface ChurchStaffGroup {
  type: string;
  staffs: ChurchStaff[];
}

export type ChurchStaffs = {
  title: string;
  groups: ChurchStaffGroup[];
};

export interface Gallery {
  title: string;
  items: {
    imageUrl: string;
    description: string;
  }[];
}

export type ChurchLogoType = "LOGO" | "LOGO_AND_CHURCH_NAME" | "CHURCH_NAME";
export interface ChurchLogo {
  type: ChurchLogoType;
  image: string | null;
}

export interface ChurchBanners {
  visible: boolean;
  items: ChurchBanner[];
}

export interface ChurchIntro {
  title: string;
  contents: Op[];
}

export interface ChurchDepartmentsAndMinisties {
  title: string;
  visible: boolean;
  items: ChurchDepartmentAndMinistry[];
}

export interface Directions {
  title: string;
  description: string;
}

export interface HomepageTypeAResponse {
  id: number | null;
  uuid: string | null;
  directions: Directions;
  churchUuid: string | null;
  ownerUuid: string | null;
  churchLogo: ChurchLogo;
  churchIntro: ChurchIntro;
  banners: ChurchBanners;
  videos: ChurchVideos;
  churchDepartmentsAndMinistries: ChurchDepartmentsAndMinisties;
  worshipServicesAndMeetings: WorshipServicesAndMeetings;
  churchRegisterGuide: Op[];
  churchStaffs: ChurchStaffs;
  gallery: Gallery;
}
