import { atom } from "recoil";

export const battleModalOpenedState = atom<boolean>({
  key: "battleModalOpenedState",
  default: false,
});
