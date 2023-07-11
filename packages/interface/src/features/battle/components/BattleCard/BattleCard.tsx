import Image from "next/image";
import { dummyImages } from "@/const/dummy";
import { BattleModel } from "@/models/BattleModel";
import { battleModalOpenedState } from "@/stores/battleModalOpenedState";
import { selectedBattleIndexState } from "@/stores/selectedBattleIndexState";
import { BaseProps } from "@/types/BaseProps";
import { getParticipantCount } from "@/utils/util";
import clsx from "clsx";
import uuid from "react-uuid";
import { useSetRecoilState } from "recoil";

export type BattleCardProps = {
  battle: BattleModel;
  index: number;
} & BaseProps;

/**
 * BattleCard
 * @keit0728
 */
export const BattleCard = ({ className, battle, index }: BattleCardProps) => {
  const setBattleModalOpened = useSetRecoilState(battleModalOpenedState);
  const setSelectedBattleIndex = useSetRecoilState(selectedBattleIndexState);

  const handleClick = () => {
    setSelectedBattleIndex(index);
    setBattleModalOpened(true);
  };

  return (
    <button
      className={clsx(
        className,
        "rounded-lg",
        "overflow-hidden",
        "p-[10px]",
        "text-start",
        "bg-primary",
        "border-[1px]",
        "border-primaryBorder",
        "hover:bg-primaryHover",
        "hover:border-primaryHoverBorder",
      )}
      onClick={handleClick}
    >
      <div className={clsx("mb-[50px]")}>
        <div className={clsx("flex", "justify-between")}>
          <div className={clsx("font-bold", "text-xl", "mb-[10px]")}>
            {battle.title}
          </div>
          <div className={clsx("")}>
            {getParticipantCount(battle.participantTokenIdsMap)} /{" "}
            {battle.maxParticipantCount}
          </div>
        </div>
        <p className={clsx("text-gray-500")}>{battle.description}</p>
      </div>
      <div className={clsx("flex")}>
        {battle.availableNFTs.map((availableNFT) => {
          const imageURL = dummyImages.get(availableNFT);
          if (imageURL === undefined) return <></>;
          return (
            <Image
              key={uuid()}
              className={clsx("mr-[10px]")}
              src={imageURL}
              alt="Battle Card"
              width={50}
              height={50}
            />
          );
        })}
      </div>
    </button>
  );
};
