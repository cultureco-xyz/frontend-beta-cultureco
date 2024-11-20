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
  console.log(imageUrl, "physical frmae");
  return (
    <div
      className={twMerge(
        "flex overflow-hidden aspect-[361/480] border-2 border-white rounded-2xl w-full ",
        className
      )}
    >
      <img src={imageUrl} className="flex w-full h-full object-cover" alt="" />
    </div>
  );
}

export default PhyiscalFrame;
