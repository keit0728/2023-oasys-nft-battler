import Image from "next/image";
import { CRYPTO_SPELLS, MCH_HERO, dummyImages } from "@/const/dummy";
import { inputAvailableNFTsState } from "@/stores/inputAvailableNFTsState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import uuid from "react-uuid";
import { useRecoilState } from "recoil";

export type AvailableNFTsInputProps = {} & BaseProps;

/**
 * AvailableNFTsInput
 * @keit0728
 */
export const AvailableNFTsInput = ({ className }: AvailableNFTsInputProps) => {
  const [availableNFTs, setAvailableNFTs] = useRecoilState(
    inputAvailableNFTsState,
  );

  const keys = Array.from(dummyImages.keys());
  return (
    <div className={clsx(className, "flex")}>
      {keys.map((key) => {
        const handleClick = () => {
          if (key === MCH_HERO || key === CRYPTO_SPELLS) {
            alert("このNFTは未対応です🙇‍♂️");
            return;
          }
          setAvailableNFTs((prevState) => {
            if (prevState.includes(key))
              return prevState.filter((prevKey) => prevKey !== key);
            return [...prevState, key];
          });
        };
        const imageURL = dummyImages.get(key);
        if (imageURL === undefined) return <></>;
        return (
          <button
            key={uuid()}
            className={clsx("mr-[10px]")}
            onClick={handleClick}
          >
            <Image
              className={clsx(availableNFTs.includes(key) ? "" : "opacity-30")}
              src={imageURL}
              alt="NFT"
              width={50}
              height={50}
            />
          </button>
        );
      })}
    </div>
  );
};
