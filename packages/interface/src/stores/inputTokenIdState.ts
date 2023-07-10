import { atom } from "recoil";

export const inputTokenIdState = atom<string>({
  key: "inputTokenIdState",
  default: "",
});
