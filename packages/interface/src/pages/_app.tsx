import type { AppProps } from "next/app";
import { mchVerseTestnet } from "@/const/chainParams";
import { BattleInit } from "@/features/battle/components/BattleInit";
import "@/styles/globals.css";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { RecoilRoot } from "recoil";
import { WagmiConfig, configureChains, createConfig } from "wagmi";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
const chains = [mchVerseTestnet];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RecoilRoot>
          <BattleInit />
          <Component {...pageProps} />
        </RecoilRoot>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
