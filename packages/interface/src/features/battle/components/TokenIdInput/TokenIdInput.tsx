import { ChangeEvent } from "react";
import { Input } from "@/components/elements/Input";
import { inputTokenIdState } from "@/stores/inputTokenIdState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilState } from "recoil";

export type TokenIdInputProps = {} & BaseProps;

/**
 * TokenIdInput
 * @keit0728
 */
export const TokenIdInput = ({ className }: TokenIdInputProps) => {
  const [inputTokenId, setInputTokenId] = useRecoilState(inputTokenIdState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTokenId(event.target.value);
  };

  return (
    <Input
      className={clsx(className)}
      value={inputTokenId}
      placeholder="トークンIDを入力"
      onChange={handleInputChange}
    />
  );
};
