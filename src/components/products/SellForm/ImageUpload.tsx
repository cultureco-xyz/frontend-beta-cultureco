import Spinner from "@/components/common/spinner";
import { handleProfilePicUpload } from "@/lib/utils";
import React, { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

function ImageUpload({
  className,
  setImageUrl,
}: {
  className?: string;
  setImageUrl: (img: string) => void;
}) {
  const [profilePicUploadProgress, setProfilePicUploadProgress] =
    useState<number>();
  return (
    <span
      className={twMerge(" flex flex-col items-center  gap-1 h-fit", className)}
    >
      <input
        id="fileupload"
        type="file"
        className="absolute w-full h-full left-0 top-0 opacity-0"
        onChange={(e) => {
          handleProfilePicUpload(e, {
            setValue: (v) => {
              setImageUrl(v);
            },
            setProgress: (p) => {
              setProfilePicUploadProgress(p);
            },
          });
        }}
      />
      {profilePicUploadProgress ? (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex w-[90%] h-[90%] justify-center items-center rounded-full p-4  m-auto mt-[9px]">
          <Spinner className="" />
        </div>
      ) : (
        <>
          <LuImagePlus className="text-white h-16 w-16" />
          <p className="text-white text-xs">Choose File</p>
        </>
      )}
    </span>
  );
}

export default ImageUpload;
