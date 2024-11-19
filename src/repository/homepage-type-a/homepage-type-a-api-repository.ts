import {
  ChurchBanners,
  ChurchDepartmentsAndMinisties,
  ChurchIntro,
  ChurchLogo,
  ChurchStaffs,
  ChurchVideos,
  Gallery,
  HomepageTypeA,
  WorshipServicesAndMeetings,
} from "../../type/homepage/homepage-type-a";

export interface HompageTypeAApiRepository {
  updateGallery(
    homepageTypeAId: string,
    userUuid: string,
    newValue: Gallery,
  ): Promise<HomepageTypeA>;
  updateChurchStaffs(
    homepageTypeAId: string,
    userUuid: string,
    churchStaffsState: ChurchStaffs,
  ): Promise<HomepageTypeA>;
  updateWorkshipServicesAndMeetings(
    homepageTypeAId: string,
    userUuid: string,
    newWorshipServicesAndMeetings: WorshipServicesAndMeetings,
  ): Promise<HomepageTypeA>;
  updateChurchDepartmentsAndMinistries(
    homepageTypeAId: number,
    userUuid: string,
    churchDepartmentState: ChurchDepartmentsAndMinisties,
  ): Promise<HomepageTypeA>;
  getHompageTypeA: (
    uuid: string,
    userUuid: string,
  ) => Promise<HomepageTypeA | null>;
  saveHomepageTypeA: (
    homepageTypeA: HomepageTypeA,
    userUuid: string,
  ) => Promise<HomepageTypeA>;

  updateChurchLogo: (
    homepageTypeAId: number,
    userUuid: string,
    churchLogo: ChurchLogo,
  ) => Promise<HomepageTypeA>;

  updateBannners: (
    homepageTypeAId: number,
    userUuid: string,
    banners: ChurchBanners,
  ) => Promise<HomepageTypeA>;

  updateChurchIntro: (
    homepageTypeAId: number,
    userUuid: string,
    churchIntro: ChurchIntro,
  ) => Promise<HomepageTypeA>;

  updateVideos: (
    homepageTypeAId: number,
    userUuid: string,
    churchVideos: ChurchVideos,
  ) => Promise<HomepageTypeA>;
}

const apiKey = "7b362dad-d4e9-4cd9-9fdc-7f5ae6be61d8";
export const homepageTypeAApiRepository = {
  async getHompageTypeA(homepageUuid: string) {
    const res = await fetch(
      `http://localhost:8088/homepages/type-a/${homepageUuid}`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );
    const json = await res.json();

    return json;
  },
};
