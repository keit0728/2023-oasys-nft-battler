import { Head, Html, Main, NextScript } from "next/document";
import clsx from "clsx";

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body className={clsx("bg-bgColor", "text-txtWhite")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
