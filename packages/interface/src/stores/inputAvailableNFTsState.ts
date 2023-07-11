import { atom } from "recoil";
import { Address } from "viem";

export const inputAvailableNFTsState = atom<Address[]>({
  key: "inputAvailableNFTsState",
  default: [],
});
