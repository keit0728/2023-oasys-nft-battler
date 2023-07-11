import { atom } from "recoil";

export const addBattleModalOpenedState = atom<boolean>({
  key: "addBattleModalOpenedState",
  default: false,
});
