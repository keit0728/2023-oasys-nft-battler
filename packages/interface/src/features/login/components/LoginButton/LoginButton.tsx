import { Button } from "@/components/elements/Button";
import { BaseProps } from "@/types/BaseProps";
import { useWeb3Modal } from "@web3modal/react";
import clsx from "clsx";

export type LoginButtonProps = {} & BaseProps;

/**
 * LoginButton
 * @keit0728
 */
export const LoginButton = ({ className }: LoginButtonProps) => {
  const { open } = useWeb3Modal();
  const handleClick = async () => {
    await open();
  };
  return (
    <Button className={clsx(className)} onClick={handleClick}>
      LOGIN
    </Button>
  );
};
