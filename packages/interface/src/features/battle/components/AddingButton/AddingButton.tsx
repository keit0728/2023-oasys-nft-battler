import Image from "next/image";
import { Button } from "@/components/elements/Button";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type AddingButtonProps = {} & BaseProps;

/**
 * AddingButton
 * @keit0728
 */
export const AddingButton = ({ className }: AddingButtonProps) => {
  return (
    <Button
      className={clsx(className, "fixed", "top-[75px]", "right-[10px]")}
      rounded="rounded-full"
    >
      <Image
        className={clsx("")}
        src="/images/add_white_24dp.svg"
        alt="Add"
        width={20}
        height={20}
      />
    </Button>
  );
};
