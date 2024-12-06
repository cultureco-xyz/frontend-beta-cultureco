"use client";
import CultureLoader from "@/components/common/cultureLoader";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CopyIcon, EyeClosed } from "lucide-react";
import React, { useState } from "react";

function Wallet() {
  const [showKey, setshowKey] = useState(false);

  const privateKey = useQuery({
    queryKey: ["get-private-key"],
    queryFn: async () => {
      const res = await axios.post("/backend/user/wallet/export");
      return res.data.private_key;
    },
  });

  return (
    <div className="bg-black flex w-full h-svh justify-center items-center">
      <div className="flex  flex-col justify-center items-center w-[361px] min-h-[603px] h-[650px] bg-grad-bg rounded-2xl ">
        {privateKey.isSuccess ? (
          <div className="flex gap-4 w-full h-full flex-col  items-center justify-center p-8">
            <h1 className="font-bold text-white text-xl">
              Export your Private Key
            </h1>
            <p className=" text-cultureWhite font-mono  break-words w-full border-2 border-white border-dotted text-xl p-4 rounded-xl h-40">
              {showKey
                ? `${privateKey.data}`
                : new Array(privateKey.data.length).fill("x")}
            </p>
            <span className="flex gap-1 ">
              <Button
                variant={"outline"}
                className="text-cultureOrange hover:text-cultureWhite"
                onClick={() => {
                  setshowKey(!showKey);
                }}
              >
                {showKey ? (
                  <>
                    <EyeClosed /> {"Hide Key"}
                  </>
                ) : (
                  <>
                    <EyeOpenIcon /> {"View Key"}
                  </>
                )}
              </Button>
              <Button
                className="bg-cultureOrange hover:bg-white"
                onClick={() => {
                  const text = privateKey.data;
                  navigator.clipboard
                    .writeText(text)
                    .then(() => {
                      console.log("Text copied to clipboard:", text);
                    })
                    .catch((err) => {
                      console.error("Failed to copy text to clipboard:", err);
                    });
                }}
              >
                <CopyIcon />
                Copy Key
              </Button>
            </span>
          </div>
        ) : (
          <CultureLoader />
        )}
      </div>
    </div>
  );
}

export default Wallet;
