import { deployBattle } from "../helpers/deploy/deployBattle";
import { postDeployBattle } from "../helpers/post-deploy/postDeployBattle";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Battle", function () {
  async function init() {
    const { battle } = await loadFixture(deployBattle);
    await postDeployBattle(battle);
    return {
      battle,
    };
  }

  describe("Deployment", function () {
    it("deploy", async function () {
      const { battle } = await loadFixture(init);
      expect(battle.address).to.not.equal(
        ethers.constants.AddressZero,
        "zero address",
      );
    });
  });

  describe("Main Logic", function () {
    // TODO: Main Logic のテストコードを書く
  });
});
