import {
  ChurchBanners,
  ChurchDepartmentsAndMinisties,
  ChurchIntro,
  ChurchLogo,
  ChurchVideos,
  HomepageTypeA,
} from "../../type/homepage/homepage-type-a";

export interface HompageTypeAApiRepository {
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
};