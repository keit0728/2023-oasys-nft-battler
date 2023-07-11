import { ChangeEvent } from "react";
import { Input } from "@/components/elements/Input";
import { inputMaxParticipantCountState } from "@/stores/inputMaxParticipantCountState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilState } from "recoil";

export type MaxParticipantCountInputProps = {} & BaseProps;

/**
 * MaxParticipantCountInput
 * @keit0728
 */
export const MaxParticipantCountInput = ({
  className,
}: MaxParticipantCountInputProps) => {
  const [input, setInput] = useRecoilState(inputMaxParticipantCountState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(Number(event.target.value));
  };

  return (
    <Input
      className={clsx(className)}
      value={input.toString()}
      placeholder="参加人数を入力"
      onChange={handleInputChange}
    />
  );
};
