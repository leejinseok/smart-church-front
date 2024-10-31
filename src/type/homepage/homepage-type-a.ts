import { Op } from "quill/core";

export interface ChurchVideos {
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
  name: string;
  description: string;
}

export interface WorshipServicesAndMeetingsInformationGroup {
  groupName: string;
  items: WorshipServicesAndMeetingsInformation[];
}

export interface WorshipServicesAndMeetingsInformation {
  name: string;
  time: string;
  location: string;
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

export interface Gallery {
  imageUrl: string;
  description: string;
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

export interface HomepageTypeA {
  id: number | null;
  uuid: string | null;
  churchLogo: ChurchLogo;
  churchIntro: ChurchIntro;
  banners: ChurchBanners;
  videos: ChurchVideos;
  churchDepartmentsAndMinistries: ChurchDepartmentAndMinistry[];
  worshipServicesAndMeetings: WorshipServicesAndMeetingsInformationGroup[];
  churchRegisterGuide: Op[];
  staffGroup: ChurchStaffGroup[];
  gallery: Gallery[];
}
