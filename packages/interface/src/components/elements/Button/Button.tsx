import { Spinner } from "@/components/elements/Spinner";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  rounded?: "rounded-lg" | "rounded-full";
  disabled?: boolean;
  loading?: boolean;
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
  disabled,
  loading,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        className,
        variants[variant],
        rounded,
        "font-bold",
        rounded === "rounded-full" ? "px-[10px]" : "px-[16px]",
        "py-[10px]",
        "text-[12px]",
        "md:text-[16px]",
      )}
      onClick={onClick}
    >
      {loading ? (
        <div
          className={clsx("flex", "justify-center", "items-center", "w-[100%]")}
        >
          <Spinner className={clsx("w-[20px]", "h-[20px]", "border-[2px]")} />
        </div>
      ) : (
        children
      )}
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
