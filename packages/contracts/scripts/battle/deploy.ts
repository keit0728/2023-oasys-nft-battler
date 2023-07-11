import { ethers, upgrades } from "hardhat";

async function main() {
  console.log("---------------------------------------------");
  console.log("--- Start Battle Deploy ---------------------");
  console.log("---------------------------------------------");
  console.log("");

  console.log("--- Deploy ----------------------------------");

  console.log("Deploying...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);

  const Battle = await ethers.getContractFactory("Battle");
  const battle = await upgrades.deployProxy(Battle, [], {
    kind: "uups",
    initializer: "initialize",
  });
  await battle.deployed();
  console.log("Deployed BattleProxy address: ", battle.address);
  console.log(
    "Battle implementation deployed to:",
    await upgrades.erc1967.getImplementationAddress(battle.address),
  );

  console.log("Completed deployment");

  console.log("");
  console.log("---------------------------------------------");
  console.log("--- End Battle Deploy -----------------------");
  console.log("---------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
