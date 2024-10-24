import { HOMEPAGE_TYPE_A_STORAGED_DATA_KEY } from "../../type/homepage/homepage";
import {
  ChurchBanner,
  ChurchBanners,
  ChurchLogo,
  HomepageTypeA,
} from "../../type/homepage/homepage-type-a";
import { homepageTypeAFormMock } from "../../type/homepage/homepage-type-a-mock";
import {
  getLocalStorageItem,
  getLocalStorageSize,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../util/local-storage-utils";

export interface HomepageTypeARepository {
  getHomepageTypeAByChurchUuid(churchUuid: string): HomepageTypeA;
}

export interface HompageTypeALocalStorageRepository {
  getHompageTypeA: () => HomepageTypeA | null;
  saveHomepageTypeA: (homepageTypeA: HomepageTypeA) => void;
  updateChurchLogo: (churchLogo: ChurchLogo) => void;
  updateBannners: (banners: ChurchBanners) => void;
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
        ) as HomepageTypeA;

        return parse;
      }

      this.saveHomepageTypeA(homepageTypeAFormMock);
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
  };
