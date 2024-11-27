"use client";
import React, { useEffect, useState } from "react";
import CultureCoLoadingIcon from "@/components/common/cultureLoader";

function Success() {
  const [failed, setfailed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setfailed(true);
      setTimeout(() => {
        location.href = "/";
      }, 500);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {!failed && (
        <h1 className="mt-24 text-white font-groteskMedium">
          Processing request..
        </h1>
      )}
      {failed && (
        <h1 className="mt-24 text-cultureRed font-fredokaBold">
          Payment Failed!
        </h1>
      )}
      <div className="text-white">
        <CultureCoLoadingIcon />
      </div>
    </div>
  );
}

export default Success;
