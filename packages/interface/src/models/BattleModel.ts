import { ObjectCopier } from "@/models/ObjectCopier";
import { Address } from "@/types/Address";
import { TokenId } from "@/types/TokenId";

export class BattleModel extends ObjectCopier {
  /**
   * Constructor
   * You must create an instance with the static method `create`.
   * ```
   * export const dummy = BattleModel.create({ title: "ウミガメのスープ" });
   * ```
   * @param title タイトル
   * @param description 詳細
   * @param availableNFTs 利用可能なNFT
   * @param maxParticipantCount 最大参加者数
   * @param participantTokenIds 参加者のトークンID配列
   */
  private constructor(
    public readonly title: string = "",
    public readonly description: string = "",
    public readonly availableNFTs: Address[] = [],
    public readonly maxParticipantCount: number = 0,
    public readonly participantTokenIds: Map<Address, TokenId[]> = new Map<
      Address,
      TokenId[]
    >(),
  ) {
    super();
  }

  /**
   * Create instance
   * @param modifyObject modifyObject
   * @return {BattleModel} BattleModel
   */
  public static create(modifyObject: {
    [P in keyof BattleModel]?: BattleModel[P];
  }): BattleModel {
    return new BattleModel().copyWith(modifyObject);
  }
}
