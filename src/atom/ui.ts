import { atom, selector } from "recoil";

export const churchEditModalState = atom({
  key: "ui/churchEditModal",
  default: {
    visible: false,
  },
});
