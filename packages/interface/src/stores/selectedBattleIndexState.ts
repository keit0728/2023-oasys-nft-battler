import { atom } from "recoil";

export const selectedBattleIndexState = atom<number>({
  key: "selectedBattleIndexState",
  default: 0,
});
