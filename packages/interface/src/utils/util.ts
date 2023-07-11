import { Address } from "@/types/Address";
import { TokenId } from "@/types/TokenId";

export const getParticipantCount = (
  participantTokenIds: Map<Address, TokenId[]>,
): number => {
  const keys = Array.from(participantTokenIds.keys());
  let participantCount = 0;
  for (let i = 0; i < keys.length; i++) {
    participantCount += participantTokenIds.get(keys[i])?.length ?? 0;
  }
  return participantCount;
};

export const getParticipantTokenIdsMap = (
  availableNFTs: Address[],
  participantNFTs: Address[],
  participantTokenIds: BigInt[],
): Map<Address, TokenId[]> => {
  const participantTokenIdsMap = new Map<Address, TokenId[]>();
  for (let i = 0; i < availableNFTs.length; i++) {
    participantTokenIdsMap.set(availableNFTs[i], []);
  }
  for (let i = 0; i < participantNFTs.length; i++) {
    const tokenIds = participantTokenIdsMap.get(participantNFTs[i])!;
    participantTokenIdsMap.set(participantNFTs[i], [
      ...tokenIds,
      participantTokenIds[i].toString(),
    ]);
  }
  return participantTokenIdsMap;
};
