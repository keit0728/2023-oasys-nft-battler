import ERC721Upgradeable from "../../../../../artifacts/ERC721Upgradeable.json";
import { ServerWallet } from "@/lib/wallet/ServerWallet";
import { Address } from "@/types/Address";
import { HDAccount, PublicActions, WalletClient } from "viem";

export class ServerErc721 {
  private constructor(
    private readonly _client: WalletClient & PublicActions,
    private readonly _account: HDAccount,
  ) {}

  /**
   * Get instance
   * @param rpcURL RPC URL
   * @return {ServerErc721} instance
   */
  public static instance(): ServerErc721 {
    const [client, account] = ServerWallet.get();
    return new ServerErc721(client, account);
  }

  // ---------------------------------------------------------
  // getter
  // ---------------------------------------------------------

  /**
   * tokenURI
   * @param address address
   * @param tokenId tokenId
   * @return {Promise<any>} token ID
   */
  tokenURI = async (address: Address, tokenId: BigInt): Promise<any> => {
    return await this._client.readContract({
      address: address,
      abi: ERC721Upgradeable.abi,
      functionName: "tokenURI",
      args: [tokenId],
    });
  };

  // ---------------------------------------------------------
  // setter
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  // main logic
  // ---------------------------------------------------------
}
