import { BattleModel } from "@/models/BattleModel";
import { atom } from "recoil";

export type BattlesState = BattleModel[];

export const battlesState = atom<BattlesState>({
  key: "battlesState",
  default: [],
});
