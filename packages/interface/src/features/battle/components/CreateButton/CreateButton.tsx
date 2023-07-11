import { useState } from "react";
import { Button } from "@/components/elements/Button";
import { useBattlesController } from "@/hooks/useBattles";
import { BattleModel } from "@/models/BattleModel";
import { createBattleModalOpenedState } from "@/stores/createBattleModalOpenedState";
import { disabledState } from "@/stores/disabledState";
import { inputAvailableNFTsState } from "@/stores/inputAvailableNFTsState";
import { inputDescriptionState } from "@/stores/inputDescriptionState";
import { inputMaxParticipantCountState } from "@/stores/inputMaxParticipantCountState";
import { inputTitleState } from "@/stores/inputTitleState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilState, useSetRecoilState } from "recoil";

export type CreateButtonProps = {} & BaseProps;

/**
 * CreateButton
 * @keit0728
 */
export const CreateButton = ({ className }: CreateButtonProps) => {
  const battlesController = useBattlesController();
  const setBattleModalOpened = useSetRecoilState(createBattleModalOpenedState);
  const [title, setTitle] = useRecoilState(inputTitleState);
  const [description, setDescription] = useRecoilState(inputDescriptionState);
  const [availableNFTs, setAvailableNFTs] = useRecoilState(
    inputAvailableNFTsState,
  );
  const [maxParticipantCount, setMaxParticipantCount] = useRecoilState(
    inputMaxParticipantCountState,
  );
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useRecoilState(disabledState);

  const handleClick = async () => {
    setDisable(true);
    setLoading(true);
    try {
      await battlesController.create(
        BattleModel.create({
          title,
          description,
          availableNFTs,
          maxParticipantCount,
        }),
      );
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        alert("エラー\n\nReason: " + e.message);
      } else alert("エラー\n\nReason: " + e);
      setDisable(false);
      setLoading(false);
      return;
    }
    setDisable(false);
    setLoading(false);
    setTitle("");
    setDescription("");
    setAvailableNFTs([]);
    setMaxParticipantCount(2);
    setBattleModalOpened(false);
  };

  return (
    <Button
      className={clsx(className)}
      variant="secondary"
      disabled={disabled}
      loading={loading}
      onClick={handleClick}
    >
      作成する
    </Button>
  );
};
