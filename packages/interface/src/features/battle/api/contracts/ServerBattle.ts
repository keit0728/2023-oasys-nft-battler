import Battle from "../../../../../artifacts/Battle.json";
import { ServerWallet } from "@/lib/wallet/ServerWallet";
import { Address } from "@/types/Address";
import { HDAccount, PublicActions, WalletClient } from "viem";

export class ServerBattle {
  private constructor(
    private readonly _client: WalletClient & PublicActions,
    private readonly _account: HDAccount,
  ) {}

  /**
   * Get instance
   * @param rpcURL RPC URL
   * @return {ServerBattle} instance
   */
  public static instance(): ServerBattle {
    const [client, account] = ServerWallet.get();
    return new ServerBattle(client, account);
  }

  // ---------------------------------------------------------
  // getter
  // ---------------------------------------------------------

  /**
   * getAccount
   * @return {Address} account
   */
  getAccount = (): Address => {
    return this._account.address;
  };

  /**
   * getBattles
   * @param tokenIds tokenIds
   * @return {Promise<any>} token ID
   */
  getBattles = async (tokenIds: BigInt[]): Promise<any> => {
    return await this._client.readContract({
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
    return await this._client.readContract({
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
}
