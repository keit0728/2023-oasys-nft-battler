import Image from "next/image";
import { dummyImages } from "@/const/dummy";
import { BattleModel } from "@/models/BattleModel";
import { Address } from "@/types/Address";
import { BaseProps } from "@/types/BaseProps";
import { TokenId } from "@/types/TokenId";
import clsx from "clsx";
import uuid from "react-uuid";

export type BattleCardProps = { battle: BattleModel } & BaseProps;

/**
 * BattleCard
 * @keit0728
 */
export const BattleCard = ({ className, battle }: BattleCardProps) => {
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
    >
      <div className={clsx("mb-[10px]")}>
        <div className={clsx("flex", "justify-between")}>
          <div className={clsx("font-bold", "text-xl", "mb-[10px]")}>
            {battle.title}
          </div>
          <div className={clsx("")}>
            {_getParticipantCount(battle.participantTokenIds)} /{" "}
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

const _getParticipantCount = (
  participantTokenIds: Map<Address, TokenId[]>,
): number => {
  const keys = Array.from(participantTokenIds.keys());
  let participantCount = 0;
  for (let i = 0; i < keys.length; i++) {
    participantCount += participantTokenIds.get(keys[i])?.length ?? 0;
  }
  return participantCount;
};
