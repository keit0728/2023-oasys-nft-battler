import { Fragment, useState } from "react";
import { AddButton } from "@/features/battle/components/AddButton";
import { AvailableNFTsInput } from "@/features/battle/components/AvailableNFTsInput";
import { DescriptionInput } from "@/features/battle/components/DescriptionInput";
import { MaxParticipantCountInput } from "@/features/battle/components/MaxParticipantCountInput";
import { TitleInput } from "@/features/battle/components/TitleInput";
import { useBattlesValue } from "@/hooks/useBattles";
import { addBattleModalOpenedState } from "@/stores/addBattleModalOpenedState";
import { selectedBattleIndexState } from "@/stores/selectedBattleIndexState";
import { BaseProps } from "@/types/BaseProps";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useRecoilState, useRecoilValue } from "recoil";

export type AddBattleModalProps = {} & BaseProps;

/**
 * AddBattleModal
 * @keit0728
 */
export const AddBattleModal = ({ className }: AddBattleModalProps) => {
  const selectedBattleIndex = useRecoilValue(selectedBattleIndexState);
  const battle = useBattlesValue()[selectedBattleIndex];
  const [opened, setOpened] = useRecoilState(addBattleModalOpenedState);
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
                <p className={clsx("text-gray-500", "mb-[10px]")}>タイトル</p>
                <TitleInput className={clsx("mb-[30px]", "w-full")} />
                <p className={clsx("text-gray-500", "mb-[10px]")}>詳細</p>
                <DescriptionInput
                  className={clsx("mb-[30px]", "w-full", "h-[200px]")}
                />
                <p className={clsx("text-gray-500", "mb-[10px]")}>
                  利用可能なNFT
                </p>
                <AvailableNFTsInput className={clsx("mb-[30px]")} />
                <p className={clsx("text-gray-500", "mb-[10px]")}>参加人数</p>
                <MaxParticipantCountInput className={clsx("mb-[30px]")} />
                <div className={clsx("flex", "justify-end")}>
                  <AddButton />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
