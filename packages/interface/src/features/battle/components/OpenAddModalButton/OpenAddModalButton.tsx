import Image from "next/image";
import { Button } from "@/components/elements/Button";
import { addBattleModalOpenedState } from "@/stores/addBattleModalOpenedState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useSetRecoilState } from "recoil";

export type OpenAddModalButtonProps = {} & BaseProps;

/**
 * OpenAddModalButton
 * @keit0728
 */
export const OpenAddModalButton = ({ className }: OpenAddModalButtonProps) => {
  const setBattleModalOpened = useSetRecoilState(addBattleModalOpenedState);

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
