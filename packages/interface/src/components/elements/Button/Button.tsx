import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  rounded?: "rounded-lg" | "rounded-full";
  onClick?: () => void;
} & BaseProps;

/**
 * Button
 * @keit0728
 */
export const Button = ({
  className,
  children,
  variant = "primary",
  rounded = "rounded-lg",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        variants[variant],
        rounded,
        "font-bold",
        rounded === "rounded-full" ? "px-[10px]" : "px-[16px]",
        "py-[10px]",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const variants = {
  primary: clsx(
    "bg-primary",
    "border-[1px]",
    "border-primaryBorder",
    "hover:bg-primaryHover",
    "hover:border-primaryHoverBorder",
  ),
  secondary: clsx(
    "bg-secondary",
    "border-[1px]",
    "border-secondaryBorder",
    "hover:bg-secondaryHover",
    "hover:border-secondaryHoverBorder",
  ),
};
