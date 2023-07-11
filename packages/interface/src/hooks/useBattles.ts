import { ClientBattle } from "@/features/battle/api/contracts/ClientBattle";
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
    const battleContract = ClientBattle.instance();
    const totalBattle = await battleContract.getTotalBattle();
    const tokenIds: BigInt[] = [];
    for (let i = 0; i < Number(totalBattle); i++) {
      tokenIds.push(BigInt(i));
    }
    const data = await battleContract.getBattles(tokenIds);
    const battles: BattleModel[] = [];
    for (let i = 0; i < data.length; i++) {
      battles.push(
        BattleModel.create({
          title: data[i].title,
          description: data[i].description,
          availableNFTs: data[i].availableNFTs,
          maxParticipantCount: data[i].maxParticipantCount,
        }),
      );
    }
    setBattles(battles);
  };

  /**
   * add
   */
  const add = async (battle: BattleModel): Promise<void> => {
    const battleContract = ClientBattle.instance();
    console.log(battle);
    await battleContract.create(battle);
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
