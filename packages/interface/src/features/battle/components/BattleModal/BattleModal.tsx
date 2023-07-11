import { Fragment, useState } from "react";
import Image from "next/image";
import { dummyImages } from "@/const/dummy";
import { JoinButton } from "@/features/battle/components/JoinButton";
import { TokenIdInput } from "@/features/battle/components/TokenIdInput";
import { useBattlesValue } from "@/hooks/useBattles";
import { battleModalOpenedState } from "@/stores/battleModalOpenedState";
import { selectedBattleIndexState } from "@/stores/selectedBattleIndexState";
import { BaseProps } from "@/types/BaseProps";
import { getParticipantCount } from "@/utils/util";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import uuid from "react-uuid";
import { useRecoilState, useRecoilValue } from "recoil";

export type BattleModalProps = {} & BaseProps;

/**
 * BattleModal
 * @keit0728
 */
export const BattleModal = ({ className }: BattleModalProps) => {
  const selectedBattleIndex = useRecoilValue(selectedBattleIndexState);
  const battle = useBattlesValue()[selectedBattleIndex];
  const [opened, setOpened] = useRecoilState(battleModalOpenedState);
  const [selectedNFT, setSelectedNFT] = useState(0);

  if (!battle) return <></>;
  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpened(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="m-6 w-full max-w-2xl transform overflow-hidden rounded-lg p-6 text-left align-middle shadow-xl transition-all border-[1px] bg-primary border-primaryBorder">
                <div className={clsx("mb-[50px]")}>
                  <div className={clsx("flex", "justify-between")}>
                    <div className={clsx("font-bold", "text-xl", "mb-[10px]")}>
                      {battle.title}
                    </div>
                    <div className={clsx("")}>
                      {getParticipantCount(battle.participantTokenIds)} /{" "}
                      {battle.maxParticipantCount}
                    </div>
                  </div>
                  <p className={clsx("text-gray-500")}>{battle.description}</p>
                </div>
                <div className={clsx("flex", "mb-[10px]")}>
                  {battle.availableNFTs.map((availableNFT, index) => {
                    const handleClick = () => {
                      setSelectedNFT(index);
                    };
                    const imageURL = dummyImages.get(availableNFT);
                    if (imageURL === undefined) return <></>;
                    return (
                      <button
                        key={uuid()}
                        className={clsx("mr-[10px]")}
                        onClick={handleClick}
                      >
                        <Image
                          className={clsx(
                            selectedNFT === index ? "" : "opacity-30",
                          )}
                          src={imageURL}
                          alt="NFT"
                          width={50}
                          height={50}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className={clsx("flex", "justify-between")}>
                  <TokenIdInput className={clsx("mr-[10px]")} />
                  <JoinButton />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
