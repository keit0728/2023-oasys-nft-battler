import { atom } from "recoil";

export const inputMaxParticipantCountState = atom<number>({
  key: "inputMaxParticipantCountState",
  default: 2,
});
