import { useState } from "react";
import { Button } from "@/components/elements/Button";
import { useBattlesController } from "@/hooks/useBattles";
import { BattleModel } from "@/models/BattleModel";
import { battleModalOpenedState } from "@/stores/battleModalOpenedState";
import { disabledState } from "@/stores/disabledState";
import { inputTokenIdState } from "@/stores/inputTokenIdState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilState, useSetRecoilState } from "recoil";

export type JoinButtonProps = {
  battle: BattleModel;
  selectedNFTIndex: number;
} & BaseProps;

/**
 * JoinButton
 * @keit0728
 */
export const JoinButton = ({
  className,
  battle,
  selectedNFTIndex,
}: JoinButtonProps) => {
  const battlesController = useBattlesController();
  const setBattleModalOpened = useSetRecoilState(battleModalOpenedState);
  const [tokenId, setTokenId] = useRecoilState(inputTokenIdState);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useRecoilState(disabledState);

  const handleClick = async () => {
    setDisable(true);
    setLoading(true);
    try {
      await battlesController.join(
        battle.id,
        battle.availableNFTs[selectedNFTIndex],
        tokenId,
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
    setTokenId("");
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
      参加する
    </Button>
  );
};
