import { Button } from "@/components/elements/Button";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type JoinButtonProps = {} & BaseProps;

/**
 * JoinButton
 * @keit0728
 */
export const JoinButton = ({ className }: JoinButtonProps) => {
  return (
    <Button className={clsx(className)} variant="secondary">
      参加する
    </Button>
  );
};
