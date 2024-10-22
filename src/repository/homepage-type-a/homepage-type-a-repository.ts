import { HOMEPAGE_TYPE_A_STORAGED_DATA_KEY } from "../../type/homepage/homepage";
import { HomepageTypeA } from "../../type/homepage/homepage-type-a";
import { homepageTypeAFormMock } from "../../type/homepage/homepage-type-a-mock";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../util/local-storage-utils";

export interface HomepageTypeARepository {
  getHomepageTypeAByChurchUuid(churchUuid: string): HomepageTypeA;
}

export interface HompageTypeALocalStorageRepository {
  getHompageTypeA: () => HomepageTypeA | null;
}

export const hompageTypeALocalStorageRepository: HompageTypeALocalStorageRepository =
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
      const homepageTypeAMockStr = encodeURIComponent(
        JSON.stringify(homepageTypeAFormMock),
      );
      setLocalStorageItem(
        HOMEPAGE_TYPE_A_STORAGED_DATA_KEY,
        homepageTypeAMockStr,
      );

      return null;
    },
  };
