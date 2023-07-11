import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TextAreaProps = {
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & BaseProps;

/**
 * TextArea
 * @keit0728
 */
export const TextArea = ({
  className,
  value,
  placeholder,
  onChange,
}: TextAreaProps) => {
  return (
    <textarea
      className={clsx(className, "p-[10px]", "bg-inputColor", "rounded-lg")}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
