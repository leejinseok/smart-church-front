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
  updateBannners: (banners: ChurchBanners) => void;
  updateChurchIntro: (churchIntro: ChurchIntro) => void;
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
  async updateChurchLogo(churchId, churchLogo) {
    // const homepageTypeA = this.getHompageTypeA();
    // if (homepageTypeA) {
    //   homepageTypeA.churchLogo = { ...churchLogo };
    //   this.saveHomepageTypeA(homepageTypeA);
    // }

    const res = await fetch(`http://localhost:8088/homepageTypeA/${churchId}`, {
      headers: {
        "content-type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        churchLogo: churchLogo,
      }),
    });

    const json = await res.json();
    return json;
  },
  updateBannners(banners) {
    const homepageTypeA = this.getHompageTypeA();
    if (homepageTypeA) {
      homepageTypeA.banners = { ...banners };
      this.saveHomepageTypeA(homepageTypeA);
    }
  },

  updateChurchIntro(churchIntro) {
    const homepageTypeA = this.getHompageTypeA();
    if (homepageTypeA) {
      homepageTypeA.churchIntro = { ...churchIntro };
      this.saveHomepageTypeA(homepageTypeA);
    }
  },
};
