import { Address } from "@/types/Address";
import { TokenId } from "@/types/TokenId";

export const getParticipantCount = (
  participantTokenIdsMap: Map<Address, TokenId[]>,
): number => {
  const keys = Array.from(participantTokenIdsMap.keys());
  let participantCount = 0;
  for (let i = 0; i < keys.length; i++) {
    participantCount += participantTokenIdsMap.get(keys[i])?.length ?? 0;
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

export const decodeBase64 = (data: string): string => {
  let base64Marker = ";base64,";
  let base64Index = data.indexOf(base64Marker) + base64Marker.length;
  let base64Data = data.substring(base64Index);
  let buffer = Buffer.from(base64Data, "base64");
  let decodedData = buffer.toString("utf8");
  return decodedData;
};

export const isNumber = (value: string) => {
  return !isNaN(parseFloat(value));
};
