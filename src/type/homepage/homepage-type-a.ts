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

export interface HomepageTypeA {
  churchIntro: Op[];
  banners: ChurchBanner[];
  videos: ChurchVideo[];
  churchDepartmentsAndMinistries: ChurchDepartmentAndMinistry[];
  worshipServicesAndMeetings: WorshipServicesAndMeetingsInformationGroup[];
  churchRegisterGuide: Op[];
  staffGroup: ChurchStaffGroup[];
  gallery: Gallery[];
}
