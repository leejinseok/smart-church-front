import { Op } from "quill/core";

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
export interface HomepageTypeA {
  churchLogo: ChurchLogo;
  churchIntro: Op[];
  banners: ChurchBanners;
  videos: ChurchVideo[];
  churchDepartmentsAndMinistries: ChurchDepartmentAndMinistry[];
  worshipServicesAndMeetings: WorshipServicesAndMeetingsInformationGroup[];
  churchRegisterGuide: Op[];
  staffGroup: ChurchStaffGroup[];
  gallery: Gallery[];
}
