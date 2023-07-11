import { BATTLE_PROXY_ADDRESS } from "../const";
import { ethers } from "hardhat";

async function main() {
  const addr = BATTLE_PROXY_ADDRESS;

  console.log("---------------------------------------------");
  console.log("--- Start Battle Post Deploy --------------");
  console.log("---------------------------------------------");
  console.log("");

  console.log("--- Post Deploy -----------------------------");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);

  const Battle = await ethers.getContractFactory("Battle");
  const battle = Battle.attach(addr);

  console.log("addAvailableNFT ------------------------------");
  const promon = "0x0ed094ac867F77e56777524B59C640157BEedF84";
  const lbr = "0x923c69439423eC3d02693f792285e98B26EA126e";
  console.log(`Before: ${await battle.getAvailableNFTs()}`);
  await (await battle.addAvailableNFT(promon)).wait();
  await (await battle.addAvailableNFT(lbr)).wait();
  console.log(`After : ${await battle.getAvailableNFTs()}`);
  console.log("DONE!!!");

  console.log("");
  console.log("---------------------------------------------");
  console.log("--- End Battle Post Deploy ----------------");
  console.log("---------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
