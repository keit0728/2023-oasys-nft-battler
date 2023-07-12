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
   * @param id id
   * @param title タイトル
   * @param description 詳細
   * @param availableNFTs 利用可能なNFT
   * @param maxParticipantCount 最大参加者数
   * @param participantTokenIdsMap 参加者のトークンID
   * @param result 戦闘結果
   */
  private constructor(
    public readonly id: string = "",
    public readonly title: string = "",
    public readonly description: string = "",
    public readonly availableNFTs: Address[] = [],
    public readonly maxParticipantCount: number = 0,
    public readonly participantTokenIdsMap: Map<Address, TokenId[]> = new Map<
      Address,
      TokenId[]
    >(),
    public readonly result: string = "",
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
