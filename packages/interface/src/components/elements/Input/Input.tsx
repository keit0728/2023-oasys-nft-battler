import { ChangeEvent } from "react";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type InputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & BaseProps;

/**
 * Input
 * @keit0728
 */
export const Input = ({
  className,
  value,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <input
      className={clsx(className, "px-[10px]", "bg-inputColor", "rounded-lg")}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
