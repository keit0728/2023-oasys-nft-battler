import type { AppProps } from "next/app";
import { BattleInit } from "@/features/battle/components/BattleInit";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <BattleInit />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
