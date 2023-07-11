import { Battle } from "../../../typechain-types";

export async function postDeployBattle(battle: Battle) {
  return {
    battle,
  };
}
