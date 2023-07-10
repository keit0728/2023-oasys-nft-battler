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
