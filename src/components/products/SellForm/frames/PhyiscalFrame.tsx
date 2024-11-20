/* eslint-disable @next/next/no-img-element */
import React from "react";
import { twMerge } from "tailwind-merge";

function PhyiscalFrame({
  className,
  imageUrl,
}: {
  className: string;
  imageUrl: string;
}) {
  return (
    <div
      className={twMerge(
        "flex overflow-hidden aspect-[361/480] border-2 border-white rounded-2xl w-full relative",
        className
      )}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          className="flex w-full h-full object-cover "
          alt=""
        />
      )}
      <div className="flex w-full h-full absolute left-0 right-0 bottom-0 top-0 mx-auto card-shadow"></div>
    </div>
  );
}

export default PhyiscalFrame;
