import { ClientBattle } from "@/features/battle/api/contracts/ClientBattle";
import { BattleModel } from "@/models/BattleModel";
import { BattlesState, battlesState } from "@/stores/battlesState";
import { decodeBase64, getParticipantTokenIdsMap } from "@/utils/util";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Address } from "viem";

export interface BattlesController {
  init: () => Promise<void>;
  create: (battle: BattleModel) => Promise<void>;
  join: (
    battleId: string,
    participantNFT: Address,
    participantTokenId: string,
  ) => Promise<void>;
  fight: (battleId: string) => Promise<void>;
  getParticipant: (battleId: string) => Promise<[any[], any[], any[]]>;
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
          id: i.toString(),
          title: data[i].title,
          description: data[i].description,
          availableNFTs: data[i].availableNFTs,
          maxParticipantCount: data[i].maxParticipantCount,
          participantTokenIdsMap: getParticipantTokenIdsMap(
            data[i].availableNFTs,
            data[i].participantNFTs,
            data[i].participantTokenIds,
          ),
        }),
      );
    }
    setBattles(battles);
  };

  /**
   * create
   * @param battle battle
   */
  const create = async (battle: BattleModel): Promise<void> => {
    const battleContract = ClientBattle.instance();
    await battleContract.create(battle);
    // TODO: #18 nonceを使って割り振られたバトルIDを取得
    const totalBattle = await battleContract.getTotalBattle();
    const participantTokenIdsMap = new Map<Address, string[]>();
    for (let i = 0; i < battle.availableNFTs.length; i++) {
      participantTokenIdsMap.set(battle.availableNFTs[i], []);
    }
    setBattles((prevState) => [
      ...prevState,
      battle.copyWith({
        id: (Number(totalBattle) - 1).toString(),
        participantTokenIdsMap,
      }),
    ]);
  };

  /**
   * join
   * @param battleId battleId
   * @param participantNFT participantNFT
   * @param participantTokenId participantTokenId
   */
  const join = async (
    battleId: string,
    participantNFT: Address,
    participantTokenId: string,
  ): Promise<void> => {
    if (participantTokenId === "" || isNaN(Number(participantTokenId)))
      throw new Error("Invalid tokenId");
    const battleContract = ClientBattle.instance();
    await battleContract.join(
      BigInt(battleId),
      participantNFT,
      BigInt(participantTokenId),
    );
    setBattles((prevState) => {
      return prevState.map((battle) => {
        if (battle.id !== battleId) return battle;
        const tokenIds = battle.participantTokenIdsMap.get(participantNFT)!;
        const newParticipantTokenIds = new Map(battle.participantTokenIdsMap);
        newParticipantTokenIds.set(participantNFT, [
          ...tokenIds,
          participantTokenId,
        ]);
        return battle.copyWith({
          participantTokenIdsMap: newParticipantTokenIds,
        });
      });
    });
  };

  /**
   * fight
   * @param battleId battleId
   */
  const fight = async (battleId: string): Promise<void> => {
    let res: any;
    try {
      res = await axios.post("/api/battle/fight", {
        battleId,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) throw new Error(e.response!.data.message);
      console.error(e);
      throw new Error("Unknown Error");
    }
    const result = res.data.result;
    setBattles((prevState) => {
      return prevState.map((battle) => {
        if (battle.id !== battleId) return battle;
        return battle.copyWith({
          result,
        });
      });
    });
  };

  /**
   * getParticipant
   * @param battleId battleId
   */
  const getParticipant = async (
    battleId: string,
  ): Promise<[any[], any[], any[]]> => {
    const battleContract = ClientBattle.instance();
    const data = await battleContract.getBatchTokenURI(BigInt(battleId));
    const tokenURIs: any[] = [];
    for (let i = 0; i < data[0].length; i++) {
      tokenURIs.push(JSON.parse(decodeBase64(data[0][i])));
    }
    const participantNFTs = data[1];
    const participantTokenIds = data[2];
    return [tokenURIs, participantNFTs, participantTokenIds];
    // let res: any;
    // try {
    //   res = await axios.post("/api/battle/fight", {
    //     battleId,
    //   });
    // } catch (e) {
    //   if (axios.isAxiosError(e)) throw new Error(e.response!.data.message);
    //   console.error(e);
    //   throw new Error("Unknown Error");
    // }
    // const result = res.data.result;
    // setBattles((prevState) => {
    //   return prevState.map((battle) => {
    //     if (battle.id !== battleId) return battle;
    //     return battle.copyWith({
    //       result,
    //     });
    //   });
    // });
  };

  const controller: BattlesController = {
    init,
    create,
    join,
    fight,
    getParticipant,
  };
  return controller;
};

export const useBattlesState = (): [BattlesState, BattlesController] => [
  useBattlesValue(),
  useBattlesController(),
];
