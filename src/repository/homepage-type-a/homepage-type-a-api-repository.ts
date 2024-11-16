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
    newValue: Gallery,
  ): Promise<HomepageTypeA>;
  updateChurchStaffs(
    homepageTypeAId: string,
    churchStaffsState: ChurchStaffs,
  ): Promise<HomepageTypeA>;
  updateWorkshipServicesAndMeetings(
    homepageTypeAId: string,
    newWorshipServicesAndMeetings: WorshipServicesAndMeetings,
  ): Promise<HomepageTypeA>;
  updateChurchDepartmentsAndMinistries(
    homepageTypeAId: number,
    churchDepartmentState: ChurchDepartmentsAndMinisties,
  ): Promise<HomepageTypeA>;
  getHompageTypeA: (uuid: string) => Promise<HomepageTypeA | null>;
  saveHomepageTypeA: (homepageTypeA: HomepageTypeA) => Promise<HomepageTypeA>;

  updateChurchLogo: (
    homepageTypeAId: number,
    churchLogo: ChurchLogo,
  ) => Promise<HomepageTypeA>;

  updateBannners: (
    homepageTypeAId: number,
    banners: ChurchBanners,
  ) => Promise<HomepageTypeA>;

  updateChurchIntro: (
    homepageTypeAId: number,
    churchIntro: ChurchIntro,
  ) => Promise<HomepageTypeA>;

  updateVideos: (
    homepageTypeAId: number,
    churchVideos: ChurchVideos,
  ) => Promise<HomepageTypeA>;
}

export const homepageTypeAMockApiRepository: HompageTypeAApiRepository = {
  async getHompageTypeA(uuid) {
    const res = await fetch(`http://localhost:8088/homepageTypeA?uuid=${uuid}`);
    const json = await res.json();
    return json[0];
  },
  async saveHomepageTypeA(homepageTypeA) {
    const res = await fetch("http://localhost:8088/homepageTypeA", {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        ...homepageTypeA,
      }),
    });

    const json = await res.json();
    return json;
  },
  async updateChurchLogo(homepageTypeAId, churchLogo) {
    const res = await fetch(
      `http://localhost:8088/homepageTypeA/${homepageTypeAId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          churchLogo: churchLogo,
        }),
      },
    );

    const json = await res.json();
    return json;
  },
  async updateBannners(homepageTypeAId, banners) {
    const res = await fetch(
      `http://localhost:8088/homepageTypeA/${homepageTypeAId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          banners: banners,
        }),
      },
    );

    const json = await res.json();
    return json;
  },

  async updateChurchIntro(homepageTypeAId, churchIntro) {
    const res = await fetch(
      `http://localhost:8088/homepageTypeA/${homepageTypeAId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          churchIntro: churchIntro,
        }),
      },
    );

    const json = await res.json();
    return json;
  },

  async updateVideos(homepageTypeAId, churchVideos) {
    const res = await fetch(
      `http://localhost:8088/homepageTypeA/${homepageTypeAId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          videos: churchVideos,
        }),
      },
    );

    const json = await res.json();
    return json;
  },
  async updateChurchDepartmentsAndMinistries(
    homepageTypeAId,
    churchDepartmentsAndMinistries,
  ) {
    const res = await fetch(
      `http://localhost:8088/homepageTypeA/${homepageTypeAId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          churchDepartmentsAndMinistries,
        }),
      },
    );

    const json = await res.json();
    return json;
  },

  async updateWorkshipServicesAndMeetings(
    homepageTypeAId,
    worshipServicesAndMeetings,
  ) {
    const res = await fetch(
      `http://localhost:8088/homepageTypeA/${homepageTypeAId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          worshipServicesAndMeetings: worshipServicesAndMeetings,
        }),
      },
    );

    const json = await res.json();
    return json;
  },
  async updateChurchStaffs(
    homepageTypeAId,
    churchStaffs,
  ): Promise<HomepageTypeA> {
    const res = await fetch(
      `http://localhost:8088/homepageTypeA/${homepageTypeAId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          churchStaffs: churchStaffs,
        }),
      },
    );

    const json = await res.json();
    return json;
  },
  async updateGallery(
    homepageTypeAId: string,
    gallery: Gallery,
  ): Promise<HomepageTypeA> {
    const res = await fetch(
      `http://localhost:8088/homepageTypeA/${homepageTypeAId}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          gallery: gallery,
        }),
      },
    );

    const json = await res.json();
    return json;
  },
};
