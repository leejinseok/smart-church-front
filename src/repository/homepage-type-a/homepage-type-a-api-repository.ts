import {
  ChurchBanners,
  ChurchDepartmentsAndMinisties,
  ChurchIntro,
  ChurchLogo,
  ChurchStaffs,
  ChurchVideos,
  Gallery,
  HomepageTypeAResponse,
  WorshipServicesAndMeetings,
} from "../../type/homepage/homepage-type-a";

export interface HompageTypeAApiRepository {
  updateGallery(
    homepageTypeAId: string,
    userUuid: string,
    newValue: Gallery,
  ): Promise<HomepageTypeAResponse>;
  updateChurchStaffs(
    homepageTypeAId: string,
    userUuid: string,
    churchStaffsState: ChurchStaffs,
  ): Promise<HomepageTypeAResponse>;
  updateWorkshipServicesAndMeetings(
    homepageTypeAId: string,
    userUuid: string,
    newWorshipServicesAndMeetings: WorshipServicesAndMeetings,
  ): Promise<HomepageTypeAResponse>;
  updateChurchDepartmentsAndMinistries(
    homepageTypeAId: number,
    userUuid: string,
    churchDepartmentState: ChurchDepartmentsAndMinisties,
  ): Promise<HomepageTypeAResponse>;
  getHompageTypeA: (
    uuid: string,
    userUuid: string,
  ) => Promise<HomepageTypeAResponse | null>;
  saveHomepageTypeA: (
    homepageTypeA: HomepageTypeAResponse,
    userUuid: string,
  ) => Promise<HomepageTypeAResponse>;

  updateChurchLogo: (
    homepageTypeAId: number,
    userUuid: string,
    churchLogo: ChurchLogo,
  ) => Promise<HomepageTypeAResponse>;

  updateBannners: (
    homepageTypeAId: number,
    userUuid: string,
    banners: ChurchBanners,
  ) => Promise<HomepageTypeAResponse>;

  updateChurchIntro: (
    homepageTypeAId: number,
    userUuid: string,
    churchIntro: ChurchIntro,
  ) => Promise<HomepageTypeAResponse>;

  updateVideos: (
    homepageTypeAId: number,
    userUuid: string,
    churchVideos: ChurchVideos,
  ) => Promise<HomepageTypeAResponse>;
}

const apiKey = "7b362dad-d4e9-4cd9-9fdc-7f5ae6be61d8";
export const homepageTypeAApiRepository = {
  async getHompage(homepageUuid: string): Promise<HomepageTypeAResponse> {
    const res = await fetch(
      `http://localhost:8088/api/v1/homepages/type-a/${homepageUuid}`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );
    const json = await res.json();

    return json;
  },

  async saveHomepage(
    data: HomepageTypeAResponse,
  ): Promise<HomepageTypeAResponse> {
    const res = await fetch(`http://localhost:8088/api/v1/homepages/type-a`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  },

  async updateHomepage(
    uuid: string,
    userUuid: string,
    data: Partial<HomepageTypeAResponse>,
  ) {
    await fetch(`http://localhost:8088/api/v1/homepages/type-a/${uuid}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "x-user-uuid": userUuid,
      },
      body: JSON.stringify({
        ...data,
      }),
    });
  },
};
