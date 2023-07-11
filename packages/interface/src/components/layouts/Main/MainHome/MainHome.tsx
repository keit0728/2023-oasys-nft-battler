import { BattleCard } from "@/features/battle/components/BattleCard";
import { BattleModal } from "@/features/battle/components/BattleModal";
import { CreateBattleModal } from "@/features/battle/components/CreateBattleModal";
import { OpenCreateModalButton } from "@/features/battle/components/OpenCreateModalButton";
import { useBattlesValue } from "@/hooks/useBattles";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import uuid from "react-uuid";

export type MainHomeProps = {} & BaseProps;

/**
 * MainHome
 * @keit0728
 */
export const MainHome = ({ className }: MainHomeProps) => {
  const battles = useBattlesValue();

  return (
    <div
      className={clsx(
        className,
        "flex",
        "flex-col",
        "items-center",
        "mt-[100px]",
        "mx-[20px]",
        "mb-[20px]",
      )}
    >
      <OpenCreateModalButton />
      <BattleModal />
      <CreateBattleModal />
      <div className={clsx("flex", "flex-wrap", "justify-evenly", "w-[100%]")}>
        {battles.map((battle, index) => {
          return (
            <BattleCard
              key={uuid()}
              className={clsx("w-[40%]", "mx-[5px]", "my-[30px]")}
              battle={battle}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};
