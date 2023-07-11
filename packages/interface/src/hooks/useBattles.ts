import { dummyBattles } from "@/const/dummy";
import { BattleModel } from "@/models/BattleModel";
import { BattlesState, battlesState } from "@/stores/battlesState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface BattlesController {
  init: () => Promise<void>;
  add: (battle: BattleModel) => Promise<void>;
}

export const useBattlesValue = (): BattlesState => {
  return useRecoilValue(battlesState);
};

export const useBattlesController = (): BattlesController => {
  const setBattles = useSetRecoilState(battlesState);

  /**
   * init
   */
  const init = async (): Promise<void> => {
    setBattles(dummyBattles);
  };

  /**
   * add
   */
  const add = async (battle: BattleModel): Promise<void> => {
    setBattles((prevState) => [...prevState, battle]);
  };

  const controller: BattlesController = {
    init,
    add,
  };
  return controller;
};

export const useBattlesState = (): [BattlesState, BattlesController] => [
  useBattlesValue(),
  useBattlesController(),
];
