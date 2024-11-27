"use client";
import React, { useEffect, useState } from "react";

import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RazorpayPurchaseButton } from "../TribePaymentBtns/RazorPayButton";
import StripePurchase from "../TribePaymentBtns/StripeButton";
import CopperXButton from "../TribePaymentBtns/CopperXButton";

function TribeModal({
  close,
  isOpen,
  member_of,
  creatorName,
  creatorProfilePic,
}: {
  close: () => void;
  isOpen: boolean;
  user: string;
  member_of: string;
  creatorName: string;
  creatorProfilePic?: string;
}) {
  const controls = useAnimationControls();
  const cardControls = useAnimationControls();
  const [subType] = useState<"MONTHLY" | "ANNUALLY">("ANNUALLY");
  const [currency, setcurrency] = useState<"INR" | "USD" | "USDC">("INR");

  const INR_AMOUNT = {
    MONTHLY: 99,
    ANNUALLY: 999,
  };

  //   const USD_AMOUNT = {
  //     MONTHLY: 4.99,
  //     ANNUALLY: 49.99,
  //   };

  const PRICE = {
    INR: {
      MONTHLY: "₹99",
      ANNUALLY: "₹999",
    },
    USD: {
      MONTHLY: "$4.99",
      ANNUALLY: "$49.99",
    },
    USDC: {
      MONTHLY: "$4.99",
      ANNUALLY: "$49.99",
    },
  };

  useEffect(() => {
    if (isOpen) {
      controls.start({
        y: "0%",
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute flex justify-center items-center w-full h-screen top-0 left-0 z-[1001] backdrop-blur-[1px]">
          <motion.main
            initial={{
              y: "100%",
            }}
            animate={controls}
            exit={{
              y: "100%",
              // Define exit transition duration
            }}
            className="w-[361px] h-[503px] px-8 rounded-2xl flex items-center justify-center bg-[#2E2F32] relative overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="rounded-full bg-cultureOrange h-[226px] w-[226px] absolute "
            ></motion.div>
            <div className="flex flex-col w-full h-full absolute backdrop-blur-3xl p-8 text-base font-groteskRegular text-cultureWhite">
              <span className="flex w-full">
                <h1
                  onClick={() => {
                    close();
                  }}
                  className="flex items-center gap-1"
                >
                  <MdOutlineKeyboardArrowLeft /> Back
                </h1>
                <Select
                  onValueChange={(value) => {
                    setcurrency(value as "INR" | "USD" | "USDC");
                  }}
                  value={currency}
                >
                  <SelectTrigger className="w-fit ml-auto ">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-cultureOrange z-[1001]">
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </span>
              <div className="flex justify-between mt-2 items-center">
                <div className="flex flex-col items-start justify-start">
                  <h2 className="mt-2">{creatorName}&apos;s Tribe</h2>
                  <h2 className="">Choose a membership</h2>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={creatorProfilePic}
                    className="object-cover overflow-hidden"
                  />
                </div>
              </div>
              <motion.div
                animate={cardControls}
                initial={{
                  backgroundColor: "#FE621D",
                }}
                className="relative w-[297px] h-[248px] border-[2px] rounded-[8px] mt-5  overflow-hidden"
              >
                <div className="opacity-10">
                  <CultureCoLogoIcon size={350} fillColor={"black"} />
                </div>
                <div className="flex flex-col w-full h-full absolute top-0 left-0 px-4 py-8">
                  <span className="flex justify-between w-full">
                    {subType == "MONTHLY" ? (
                      <>
                        <h1 className="flex text-xl items-center h-min  gap-1">
                          <CultureCoLogoIcon size={20} fillColor="white" />
                          Monthly
                        </h1>
                        <h1>
                          <strong>{PRICE[currency]["MONTHLY"]}</strong>/month
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="flex text-xl items-center h-min  gap-1">
                          <CultureCoLogoIcon size={20} fillColor="white" />
                          Annually
                        </h1>
                        <h1>
                          <strong>{PRICE[currency]["ANNUALLY"]}</strong>/year
                        </h1>
                      </>
                    )}
                  </span>
                  <div className="flex flex-col w-full gap-4 pt-6 text-[12px] leading-[16px]">
                    {[
                      "Discounts on all Products.",
                      "Early Access to New Products.",
                      "Exclusive Access to Member-Only Features.",
                      "Access to social features in the feed.",
                    ].map((ele, idx) => {
                      return (
                        <div className="flex gap-4" key={idx + "ln"}>
                          <p>+</p>
                          <p>{ele}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
              {/* <h1 className="flex mx-auto my-2">OR</h1> */}
              {/* {subType == "MONTHLY" ? (
                <>
                  <div
                    onClick={() => {
                      setSubType("ANNUALLY");
                      cardControls.start({
                        backgroundColor: "#007BFF",
                      });
                    }}
                    className="flex w-[297px] border-[2px] rounded-[8px] p-[14px] justify-between h-[66px] items-center"
                  >
                    <span className="flex flex-col gap-2">
                      <h1 className="text-[20px] leading-3">Save 10%</h1>
                      <p className="text-[12px] leading-3">
                        by paying annually
                      </p>
                    </span>
                    <span className="flex flex-col gap-2">
                      <h1 className="text-[20px] leading-3">
                        {PRICE[currency]["ANNUALLY"]}/year
                      </h1>
                    </span>
                  </div>
                </>
              ) : (
                <div
                  onClick={() => {
                    setSubType("MONTHLY");
                    cardControls.start({
                      backgroundColor: "#FE621D",
                    });
                  }}
                  className="flex w-[297px] border-[2px] rounded-[8px] p-[14px] justify-between h-[66px] items-center"
                >
                  <span className="flex flex-col gap-2">
                    <h1 className="text-[20px] leading-3">Pay Monthly</h1>
                  </span>
                  <span className="flex flex-col gap-2">
                    <h1 className="text-[20px] leading-3">
                      {PRICE[currency]["MONTHLY"]}/month
                    </h1>
                  </span>
                </div>
              )} */}
              <div className="mt-8">
                {currency == "INR" && (
                  <RazorpayPurchaseButton
                    creator={member_of}
                    cost={INR_AMOUNT[subType]}
                  />
                )}
                {currency == "USD" && (
                  <StripePurchase
                    creator={member_of}
                    cost={INR_AMOUNT[subType]}
                  />
                )}
                {currency == "USDC" && (
                  <CopperXButton
                    creator={member_of}
                    cost={INR_AMOUNT[subType]}
                  />
                )}
              </div>
            </div>
          </motion.main>
        </div>
      )}
    </AnimatePresence>
  );
}

export default TribeModal;
