import { BattleModel } from "@/models/BattleModel";
import { Address } from "@/types/Address";
import { TokenId } from "@/types/TokenId";

export const PROMON = "0x0ed094ac867F77e56777524B59C640157BEedF84"; // mchTestnet
export const LBR = "0x923c69439423eC3d02693f792285e98B26EA126e"; // mchTestnet
export const MCH_HERO = "0x4Fd249b274F012ccCcbae14eCEe180571f25284B"; // polygon
export const CRYPTO_SPELLS = "0xb70b8191F47E82E5d22b0a6224E0F11eb2e276DF"; // polygon

export const dummyBattles = [
  BattleModel.create({
    title: "プロモンカップ",
    description: "非公式プロモンマスターを決めます。",
    availableNFTs: [PROMON],
    maxParticipantCount: 5,
    participantTokenIdsMap: new Map<Address, TokenId[]>([
      [PROMON, ["0", "1", "2", "3"]],
    ]),
  }),
  BattleModel.create({
    title: "プロモン vs Loot By Rouge",
    description: "プロモンとLBRのクラン戦!!!",
    availableNFTs: [PROMON, LBR],
    maxParticipantCount: 5,
    participantTokenIdsMap: new Map<Address, TokenId[]>([
      [PROMON, ["0"]],
      [LBR, ["0"]],
    ]),
  }),
];

export const dummyImages = new Map<Address, string>([
  [PROMON, "/images/prompt-monsters-icon.svg"],
  [LBR, "/images/lootbyrogue_logo_square.png"],
  [MCH_HERO, "/images/MCH_logo_square_L.png"],
  [CRYPTO_SPELLS, "/images/crypto-spells-logo.png"],
]);
