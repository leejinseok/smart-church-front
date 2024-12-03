import { atom, selector } from "recoil";
import { HomepageTypeAResponse } from "../type/homepage/homepage-type-a";
import { getCookie } from "../util/cookie-utils";
import { homepageTypeAApiRepository } from "../repository/homepage-type-a/homepage-type-a-api-repository";

export const homepageTypeAAtom = atom({
  key: "homepage-type-a",
  default: null as HomepageTypeAResponse | null,
});

export const homepageTypeASelector = selector({
  key: "homepage-type-a/selector",
  get: async () => {
    const homepageUuid = getCookie("homepageUuid");
    if (!homepageUuid) {
      return null;
    }

    const res = await homepageTypeAApiRepository.getHompage(homepageUuid);
    return res;
  },
});
