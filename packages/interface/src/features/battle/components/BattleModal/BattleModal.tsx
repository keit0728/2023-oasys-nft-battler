import { Fragment, useState } from "react";
import Image from "next/image";
import { dummyImages } from "@/const/dummy";
import { JoinButton } from "@/features/battle/components/JoinButton";
import { ResultButton } from "@/features/battle/components/ResultButton";
import { TokenIdInput } from "@/features/battle/components/TokenIdInput";
import { useBattlesController, useBattlesValue } from "@/hooks/useBattles";
import { useLayoutEffectOfSSR } from "@/hooks/useLayoutEffectOfSSR";
import { battleModalOpenedState } from "@/stores/battleModalOpenedState";
import { disabledState } from "@/stores/disabledState";
import { selectedBattleIndexState } from "@/stores/selectedBattleIndexState";
import { BaseProps } from "@/types/BaseProps";
import { getParticipantCount } from "@/utils/util";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import uuid from "react-uuid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export type BattleModalProps = {} & BaseProps;

/**
 * BattleModal
 * @keit0728
 */
export const BattleModal = ({ className }: BattleModalProps) => {
  const selectedBattleIndex = useRecoilValue(selectedBattleIndexState);
  const battle = useBattlesValue()[selectedBattleIndex];
  const battlesController = useBattlesController();
  const [opened, setOpened] = useRecoilState(battleModalOpenedState);
  const [selectedNFTIndex, setSelectedNFTIndex] = useState(0);
  const setDisabled = useSetRecoilState(disabledState);
  const [tokenURIs, setTokenURIs] = useState<any[]>([]);
  const [participantNFTs, setParticipantNFTs] = useState<any[]>([]);
  const [participantTokenIds, setParticipantTokenIds] = useState<any[]>([]);

  const getParticipant = async () => {
    setDisabled(true);
    setTokenURIs([]);
    setParticipantNFTs([]);
    setParticipantTokenIds([]);
    try {
      const [newTokenURIs, newParticipantNFTs, newParticipantTokenIds] =
        await battlesController.getParticipant(battle.id);
      setTokenURIs(newTokenURIs);
      setParticipantNFTs(newParticipantNFTs);
      setParticipantTokenIds(newParticipantTokenIds);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        alert("エラー\n\nReason: " + e.message);
      } else alert("エラー\n\nReason: " + e);
    }
    setDisabled(false);
  };

  useLayoutEffectOfSSR(() => {
    if (!battle) return;
    getParticipant();
  }, [battle]);

  if (!battle) return <></>;
  const participantCount = getParticipantCount(battle.participantTokenIdsMap);
  const keys = Array.from(battle.participantTokenIdsMap.keys());
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
              <Dialog.Panel className="m-6 w-full max-w-2xl transform overflow-hidden rounded-lg p-6 text-left align-middle shadow-xl transition-all border-[1px] bg-primary border-primaryBorder relative">
                <div className={clsx("absolute", "right-[24px]")}>
                  {participantCount} / {battle.maxParticipantCount}
                </div>
                <div className={clsx("mb-[30px]")}>
                  <div
                    className={clsx(
                      "font-bold",
                      "text-lg",
                      "mb-[10px]",
                      "w-[80%]",
                      "md:text-xl",
                      "md:w-[90%]",
                    )}
                  >
                    {battle.title}
                  </div>
                  <p
                    className={clsx(
                      "text-gray-500",
                      "text-[12px]",
                      "md:text-[16px]",
                    )}
                  >
                    {battle.description}
                  </p>
                </div>
                {participantCount === 0 ? (
                  <></>
                ) : (
                  <>
                    <p
                      className={clsx(
                        "text-gray-500",
                        "mb-[10px]",
                        "text-[12px]",
                        "md:text-[16px]",
                      )}
                    >
                      参加者
                    </p>
                    <div
                      className={clsx(
                        "border-[1px]",
                        "border-primaryBorder",
                        "rounded-lg",
                        "p-[10px]",
                        "h-[70px]",
                        "overflow-y-scroll",
                        "text-[14px]",
                        "whitespace-pre-wrap",
                        "md:h-[100px]",
                        "md:text-[16px]",
                      )}
                    >
                      {tokenURIs.length === 0 ? (
                        <></>
                      ) : (
                        tokenURIs.map((tokenURI, i) => {
                          const imageURL = dummyImages.get(participantNFTs[i])!;
                          return (
                            <div
                              key={uuid()}
                              className={clsx("flex", "mb-[10px]")}
                            >
                              <Image
                                className={clsx("mr-[10px]")}
                                src={imageURL}
                                alt="NFT"
                                width={20}
                                height={20}
                              />
                              <div className={clsx("mr-[10px]")}>
                                {participantTokenIds[i].toString()}
                              </div>
                              <div className={clsx("")}>
                                {tokenURIs[i].name}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
                <div className={clsx("flex", "mt-[30px]", "mb-[20px]")}>
                  {battle.availableNFTs.map((availableNFT, index) => {
                    const handleClick = () => {
                      setSelectedNFTIndex(index);
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
                            participantCount >= battle.maxParticipantCount
                              ? ""
                              : selectedNFTIndex === index
                              ? ""
                              : "opacity-30",
                            "w-[40px]",
                            "h-[40px]",
                            "md:w-[50px]",
                            "md:h-[50px]",
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
                  {participantCount >= battle.maxParticipantCount ? (
                    <>
                      <div className={clsx("mr-[10px]")} />
                      <ResultButton battle={battle} />
                    </>
                  ) : (
                    <>
                      <TokenIdInput className={clsx("mr-[10px]")} />
                      <JoinButton
                        battle={battle}
                        selectedNFTIndex={selectedNFTIndex}
                      />
                    </>
                  )}
                </div>
                {battle.result === "" ? (
                  <></>
                ) : (
                  <div
                    className={clsx(
                      "mt-[10px]",
                      "border-[1px]",
                      "border-primaryBorder",
                      "rounded-lg",
                      "p-[10px]",
                      "h-[170px]",
                      "overflow-y-scroll",
                      "text-[12px]",
                      "whitespace-pre-wrap",
                      "md:h-[400px]",
                      "md:text-[16px]",
                    )}
                  >
                    {battle.result}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
