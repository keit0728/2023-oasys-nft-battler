import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import { useWeb3Modal } from "@web3modal/react";
import clsx from "clsx";
import { useAccount } from "wagmi";

export type LoginedInfoProps = BaseProps;

/**
 * LoginedInfo
 * @keit0728
 * @param className Style from parent element
 */
export const LoginedInfo = ({ className }: LoginedInfoProps) => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const handleClick = async () => {
    await open();
  };

  return (
    <div
      className={clsx(
        className,
        "flex",
        "items-center",
        "rounded-full",
        "select-none",
        "cursor-pointer",
        "bg-primary",
        "border-t-[1px]",
        "border-b-[1px]",
        "border-r-[1px]",
        "border-primaryBorder",
      )}
      onClick={handleClick}
    >
      <Image
        className={clsx(
          "rounded-full",
          "w-[30px]",
          "h-[30px]",
          "border-[1px]",
          "border-primaryBorder",
          "mr-[10px]",
          "p-[5px]",
          "md:w-[40px]",
          "md:h-[40px]",
        )}
        src="/images/sports_mma_white_24dp.svg"
        alt="icon"
        width={50}
        height={50}
      />
      <div
        className={clsx(
          "w-[50px]",
          "truncate",
          "text-[8px]",
          "md:text-[15px]",
          "md:w-[100px]",
        )}
      >
        {address}
      </div>
    </div>
  );
};
