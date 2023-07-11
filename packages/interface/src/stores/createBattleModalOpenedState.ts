import { atom } from "recoil";

export const createBattleModalOpenedState = atom<boolean>({
  key: "createBattleModalOpenedState",
  default: false,
});
