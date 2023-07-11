import { TextArea } from "@/components/elements/TextArea";
import { inputDescriptionState } from "@/stores/inputDescriptionState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilState } from "recoil";

export type DescriptionInputProps = {} & BaseProps;

/**
 * DescriptionInput
 * @keit0728
 */
export const DescriptionInput = ({ className }: DescriptionInputProps) => {
  const [input, setInput] = useRecoilState(inputDescriptionState);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <TextArea
      className={clsx(className)}
      value={input}
      placeholder="詳細を入力"
      onChange={handleInputChange}
    />
  );
};
