import Battle from "../../../../../artifacts/Battle.json";
import { ClientWallet } from "@/lib/wallet/ClientWallet";
import { BattleModel } from "@/models/BattleModel";
import { Address } from "@/types/Address";
import { TransactionReceipt } from "viem";

export class ClientBattle {
  private constructor(private readonly _wallet: ClientWallet) {}

  /**
   * Get instance
   * @param rpcURL RPC URL
   * @return {ClientBattle} instance
   */
  public static instance(): ClientBattle {
    const wallet = ClientWallet.instance();
    return new ClientBattle(wallet);
  }

  // ---------------------------------------------------------
  // getter
  // ---------------------------------------------------------

  /**
   * getTotalBattle
   * @return {Promise<any>} token ID
   */
  getTotalBattle = async (): Promise<BigInt> => {
    return (await this._wallet.client.readContract({
      address: process.env.NEXT_PUBLIC_BATTLE_CONTRACT as `0x${string}`,
      abi: Battle.abi,
      functionName: "getTotalBattle",
      args: [],
    })) as BigInt;
  };

  /**
   * getBattles
   * @param tokenIds tokenIds
   * @return {Promise<any>} token ID
   */
  getBattles = async (tokenIds: BigInt[]): Promise<any> => {
    return await this._wallet.client.readContract({
      address: process.env.NEXT_PUBLIC_BATTLE_CONTRACT as `0x${string}`,
      abi: Battle.abi,
      functionName: "getBattles",
      args: [tokenIds],
    });
  };

  /**
   * getBatchTokenURI
   * @param battleId battleId
   * @return {Promise<any>} token ID
   */
  getBatchTokenURI = async (battleId: BigInt): Promise<any> => {
    return await this._wallet.client.readContract({
      address: process.env.NEXT_PUBLIC_BATTLE_CONTRACT as `0x${string}`,
      abi: Battle.abi,
      functionName: "getBatchTokenURI",
      args: [battleId],
    });
  };

  // ---------------------------------------------------------
  // setter
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  // main logic
  // ---------------------------------------------------------

  /**
   * create
   * @param battle battle
   * @return {Promise<TransactionReceipt>} receipt
   */
  create = async (battle: BattleModel): Promise<TransactionReceipt> => {
    const [walletClient, address] = await this._wallet.get();

    const { request } = await this._wallet.client.simulateContract({
      account: address,
      address: process.env.NEXT_PUBLIC_BATTLE_CONTRACT as `0x${string}`,
      abi: Battle.abi,
      functionName: "create",
      args: [
        battle.title,
        battle.description,
        battle.availableNFTs,
        battle.maxParticipantCount,
      ],
    });
    const hash = await walletClient.writeContract(request);
    return await this._wallet.client.waitForTransactionReceipt({ hash });
  };

  /**
   * join
   * @param battleId battleId
   * @param participantNFT participantNFT
   * @param participantTokenId participantTokenId
   * @return {Promise<TransactionReceipt>} receipt
   */
  join = async (
    battleId: BigInt,
    participantNFT: Address,
    participantTokenId: BigInt,
  ): Promise<TransactionReceipt> => {
    const [walletClient, address] = await this._wallet.get();

    const { request } = await this._wallet.client.simulateContract({
      account: address,
      address: process.env.NEXT_PUBLIC_BATTLE_CONTRACT as `0x${string}`,
      abi: Battle.abi,
      functionName: "join",
      args: [battleId, participantNFT, participantTokenId],
    });
    const hash = await walletClient.writeContract(request);
    return await this._wallet.client.waitForTransactionReceipt({ hash });
  };
}
