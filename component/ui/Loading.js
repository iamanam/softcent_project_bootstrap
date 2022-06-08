import Image from "next/image";

const LOADINGIMAGES = {
  2: "/images/loading2.gif",
  3: "/images/loading3.gif",
};

export function RenderLoadingImage({ no = 3 }) {
  return (
    <div className="flex w-full justify-center items-center">
      <Image
        alt="loading..."
        width={100}
        height={100}
        objectFit="contain"
        className="loading"
        src={LOADINGIMAGES[no]}
      ></Image>
    </div>
  );
}
