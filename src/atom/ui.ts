import { atom, selector } from "recoil";

export const churchEditModalState = atom({
  key: "ui/churchEditModal",
  default: {
    visible: false,
  },
});

export const homepageRegisterModalState = atom({
  key: "ui/homepageRegisterModal",
  default: {
    visible: false,
  },
});
