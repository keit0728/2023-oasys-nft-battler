import { ChangeEvent } from "react";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type InputProps = {
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
} & BaseProps;

/**
 * Input
 * @keit0728
 */
export const Input = ({
  className,
  type = "text",
  value,
  placeholder,
  onChange,
  onBlur,
}: InputProps) => {
  return (
    <input
      className={clsx(className, "p-[10px]", "bg-inputColor", "rounded-lg")}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
