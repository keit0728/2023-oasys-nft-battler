import { AddingButton } from "@/features/battle/components/AddingButton";
import { BattleCard } from "@/features/battle/components/BattleCard";
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
      <AddingButton />
      <div className={clsx("flex", "flex-wrap", "justify-evenly", "w-[100%]")}>
        {battles.map((battle) => {
          return (
            <BattleCard
              key={uuid()}
              className={clsx("w-[40%]", "m-[5px]")}
              battle={battle}
            />
          );
        })}
      </div>
    </div>
  );
};
