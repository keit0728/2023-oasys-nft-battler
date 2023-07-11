import { useState } from "react";
import { Logo } from "@/components/elements/Logo";
import { LoginButton } from "@/features/login/components/LoginButton";
import { LoginedInfo } from "@/features/login/components/LoginedInfo";
import { useLayoutEffectOfSSR } from "@/hooks/useLayoutEffectOfSSR";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useAccount } from "wagmi";

export type HeaderProps = {} & BaseProps;

/**
 * Header
 * @keit0728
 */
export const Header = ({ className }: HeaderProps) => {
  const { address } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  useLayoutEffectOfSSR(() => {
    setHasMounted(true);
  }, []);

  return (
    <header
      className={clsx(
        className,
        "fixed",
        "w-[100%]",
        "top-0",
        "z-[1]",
        "bg-headerColor",
        "p-[10px]",
        "flex",
        "items-center",
        "justify-between",
      )}
    >
      <Logo />
      {hasMounted ? address ? <LoginedInfo /> : <LoginButton /> : <></>}
    </header>
  );
};
