import { atom } from "recoil";

export const inputDescriptionState = atom<string>({
  key: "inputDescriptionState",
  default: "",
});
