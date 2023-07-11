import { BattleModel } from "@/models/BattleModel";
import { Address } from "@/types/Address";
import { TokenId } from "@/types/TokenId";

const promon = "0x0ed094ac867F77e56777524B59C640157BEedF84";
const lbr = "0x923c69439423eC3d02693f792285e98B26EA126e";

export const dummyBattles = [
  BattleModel.create({
    title: "プロモンカップ",
    description: "非公式プロモンマスターを決めます。",
    availableNFTs: [promon],
    maxParticipantCount: 5,
    participantTokenIdsMap: new Map<Address, TokenId[]>([
      [promon, ["0", "1", "2", "3"]],
    ]),
  }),
  BattleModel.create({
    title: "プロモン vs Loot By Rouge",
    description: "プロモンとLBRのクラン戦!!!",
    availableNFTs: [promon, lbr],
    maxParticipantCount: 5,
    participantTokenIdsMap: new Map<Address, TokenId[]>([
      [promon, ["0"]],
      [lbr, ["0"]],
    ]),
  }),
];

export const dummyImages = new Map<Address, string>([
  [promon, "/images/prompt-monsters-icon.svg"],
  [lbr, "/images/lootbyrogue_logo_square.png"],
]);
