import { useBattlesController } from "@/hooks/useBattles";
import { useLayoutEffectOfSSR } from "@/hooks/useLayoutEffectOfSSR";
import { disabledState } from "@/stores/disabledState";
import { BaseProps } from "@/types/BaseProps";
import { useSetRecoilState } from "recoil";

export type BattleInitProps = {} & BaseProps;

/**
 * BattleInit
 * @keit0728
 */
export const BattleInit = ({ children }: BattleInitProps) => {
  const battleController = useBattlesController();
  const setDisabled = useSetRecoilState(disabledState);

  const init = async () => {
    setDisabled(true);
    try {
      await battleController.init();
    } catch (e) {
      console.error(e);
      alert("エラー\n\n理由: " + e);
    }
    setDisabled(false);
  };

  useLayoutEffectOfSSR(() => {
    init();
  }, []);

  return <>{children}</>;
};
