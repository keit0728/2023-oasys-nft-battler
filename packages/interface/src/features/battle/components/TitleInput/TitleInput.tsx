import { ChangeEvent } from "react";
import { Input } from "@/components/elements/Input";
import { inputTitleState } from "@/stores/inputTitleState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilState } from "recoil";

export type TitleInputProps = {} & BaseProps;

/**
 * TitleInput
 * @keit0728
 */
export const TitleInput = ({ className }: TitleInputProps) => {
  const [input, setInput] = useRecoilState(inputTitleState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <Input
      className={clsx(className)}
      value={input}
      placeholder="タイトルを入力"
      onChange={handleInputChange}
    />
  );
};
