import { dummyBattles } from "@/const/dummy";
import { BattlesState, battlesState } from "@/stores/battlesState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface BattlesController {
  init: () => Promise<void>;
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

  const controller: BattlesController = {
    init,
  };
  return controller;
};

export const useBattlesState = (): [BattlesState, BattlesController] => [
  useBattlesValue(),
  useBattlesController(),
];
