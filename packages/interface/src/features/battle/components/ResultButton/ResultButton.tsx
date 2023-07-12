import { useState } from "react";
import { Button } from "@/components/elements/Button";
import { useBattlesController } from "@/hooks/useBattles";
import { BattleModel } from "@/models/BattleModel";
import { disabledState } from "@/stores/disabledState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilState } from "recoil";

export type ResultButtonProps = {
  battle: BattleModel;
} & BaseProps;

/**
 * ResultButton
 * @keit0728
 */
export const ResultButton = ({ className, battle }: ResultButtonProps) => {
  const battlesController = useBattlesController();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useRecoilState(disabledState);

  const handleClick = async () => {
    setDisable(true);
    setLoading(true);
    try {
      await battlesController.fight(battle.id);
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
  };
  return (
    <Button
      className={clsx(className)}
      variant="secondary"
      disabled={disabled}
      loading={loading}
      onClick={handleClick}
    >
      戦闘結果を見る
    </Button>
  );
};
