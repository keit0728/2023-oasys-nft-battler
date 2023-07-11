import Image from "next/image";
import { Button } from "@/components/elements/Button";
import { createBattleModalOpenedState } from "@/stores/createBattleModalOpenedState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";

export type OpenCreateModalButtonProps = {} & BaseProps;

/**
 * OpenCreateModalButton
 * @keit0728
 */
export const OpenCreateModalButton = ({
  className,
}: OpenCreateModalButtonProps) => {
  const setBattleModalOpened = useSetRecoilState(createBattleModalOpenedState);

  const handleClick = () => {
    setBattleModalOpened(true);
  };

  return (
    <Button
      className={clsx(className, "fixed", "top-[75px]", "right-[10px]")}
      rounded="rounded-full"
      onClick={handleClick}
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
