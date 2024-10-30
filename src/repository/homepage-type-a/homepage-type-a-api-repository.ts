import {
  ChurchBanners,
  ChurchIntro,
  ChurchLogo,
  HomepageTypeA,
} from "../../type/homepage/homepage-type-a";

export interface HompageTypeAApiRepository {
  getHompageTypeA: (uuid: string) => Promise<HomepageTypeA | null>;
  saveHomepageTypeA: (homepageTypeA: HomepageTypeA) => Promise<HomepageTypeA>;
  updateChurchLogo: (
    churchId: number,
    churchLogo: ChurchLogo,
  ) => Promise<HomepageTypeA>;
  updateBannners: (
    churchId: number,
    banners: ChurchBanners,
  ) => Promise<HomepageTypeA>;
  updateChurchIntro: (
    churchId: number,
    churchIntro: ChurchIntro,
  ) => Promise<HomepageTypeA>;
}

export const homepageTypeAApiRepository: HompageTypeAApiRepository = {
  async getHompageTypeA(uuid) {
    const res = await fetch(`http://localhost:8088/homepageTypeA?uuid=${uuid}`);
    const json = await res.json();
    return json[0];
  },
  async saveHomepageTypeA(homepageTypeA) {
    const res = await fetch("http://localhost:8088/homepageTypeA", {
      method: "post",
      body: JSON.stringify({
        ...homepageTypeA,
      }),
    });

    const json = await res.json();
    return json;
  },
  async updateChurchLogo(homepageTypeAId, churchLogo) {
    // const homepageTypeA = this.getHompageTypeA();
    // if (homepageTypeA) {
    //   homepageTypeA.churchLogo = { ...churchLogo };
    //   this.saveHomepageTypeA(homepageTypeA);
    // }

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
};
