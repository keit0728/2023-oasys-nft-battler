import { BATTLE_PROXY_ADDRESS } from "../../const";
import { ethers } from "hardhat";

async function main() {
  const addr = BATTLE_PROXY_ADDRESS;
  const Battle = await ethers.getContractFactory("Battle");
  const battle = Battle.attach(addr);

  console.log("getBattles ------------------------------");
  const totalBattle = await battle.getTotalBattle();
  const tokenIds: number[] = [];
  for (let i = 0; i < Number(totalBattle); i++) {
    tokenIds.push(i);
  }
  const battles = await battle.getBattles(tokenIds);
  console.log(battles);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
