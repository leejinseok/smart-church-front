import { Op } from "quill/core";
import { HOMEPAGE_TYPE_A_STORAGED_DATA_KEY } from "../../type/homepage/homepage";
import {
  ChurchBanner,
  ChurchBanners,
  ChurchIntro,
  ChurchLogo,
  HomepageTypeAResponse,
} from "../../type/homepage/homepage-type-a";
import { homepageTypeADefault } from "../../type/homepage/homepage-type-a-mock";
import {
  getLocalStorageItem,
  getLocalStorageSize,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../util/local-storage-utils";

export interface HomepageTypeARepository {
  getHomepageTypeAByChurchUuid(churchUuid: string): HomepageTypeAResponse;
}

export interface HompageTypeALocalStorageRepository {
  getHompageTypeA: () => HomepageTypeAResponse | null;
  saveHomepageTypeA: (homepageTypeA: HomepageTypeAResponse) => void;
  updateChurchLogo: (churchLogo: ChurchLogo) => void;
  updateBannners: (banners: ChurchBanners) => void;
  updateChurchIntro: (churchIntro: ChurchIntro) => void;
}

export const homepageTypeALocalStorageRepository: HompageTypeALocalStorageRepository =
  {
    getHompageTypeA() {
      const homepageTypeALocalStorageItem = getLocalStorageItem(
        HOMEPAGE_TYPE_A_STORAGED_DATA_KEY,
      ) as string;

      if (homepageTypeALocalStorageItem) {
        const parse = JSON.parse(
          decodeURIComponent(homepageTypeALocalStorageItem),
        ) as HomepageTypeAResponse;

        return parse;
      }

      this.saveHomepageTypeA(homepageTypeADefault);
      return null;
    },
    saveHomepageTypeA(homepageTypeA) {
      const encoded = encodeURIComponent(JSON.stringify(homepageTypeA));
      removeLocalStorageItem(HOMEPAGE_TYPE_A_STORAGED_DATA_KEY);
      setLocalStorageItem(HOMEPAGE_TYPE_A_STORAGED_DATA_KEY, encoded);
    },
    updateChurchLogo(churchLogo) {
      const homepageTypeA = this.getHompageTypeA();
      if (homepageTypeA) {
        homepageTypeA.churchLogo = { ...churchLogo };
        this.saveHomepageTypeA(homepageTypeA);
      }
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
