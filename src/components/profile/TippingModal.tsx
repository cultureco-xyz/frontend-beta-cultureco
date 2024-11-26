import React, { useEffect, useState } from "react";
import { RazorpayPurchaseButton } from "../TipPaymentBtns/RazorPayButton";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StripePurchase from "../TipPaymentBtns/StripeButton";
import CopperXButton from "../TipPaymentBtns/CopperXButton";

function TipModal({
  close,
  isOpen,
  creator,
}: {
  close: () => void;
  isOpen: boolean;
  user: string;
  creator: string;
}) {
  const controls = useAnimationControls();

  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [currency, setcurrency] = useState<"INR" | "USD" | "USDC">("INR");
  useEffect(() => {
    if (isOpen) {
      controls.start({
        y: "0%",
      });
    }
  }, [isOpen]);

  const PRICE = {
    INR: {
      opt1: { text: "₹250", value: 250 },
      opt2: { text: "₹500", value: 500 },
      opt3: { text: "₹1000", value: 1000 },
    },
    USD: {
      opt1: { text: "$5", value: 5 },
      opt2: { text: "$10", value: 10 },
      opt3: { text: "$20", value: 20 },
    },
    USDC: {
      opt1: { text: "$5", value: 5 },
      opt2: { text: "$10", value: 10 },
      opt3: { text: "$20", value: 20 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute flex justify-center items-center w-full h-screen top-0 left-0 z-20 backdrop-blur-[1px]">
          <motion.main
            initial={{
              y: "100%",
            }}
            animate={controls}
            exit={{
              y: "100%",
              // Define exit transition duration
            }}
            className="w-[361px] h-[500px] px-8 rounded-2xl flex items-center justify-center bg-[#2E2F32] relative overflow-hidden"
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
            <div className="flex flex-col w-full h-full absolute backdrop-blur-3xl text-base font-groteskRegular text-cultureWhite">
              <div className="flex px-6 w-full pt-6 justify-between items-center">
                <h1
                  onClick={() => {
                    close();
                  }}
                  className="flex items-center  "
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
              </div>
              <div>
                <h2 className="p-8 font-groteskRegular text-lg">
                  How much would you like to tip?
                </h2>
              </div>
              {currency == "INR" && (
                <div className="flex flex-col items-start p-8 space-y-4">
                  {/* Custom amount input */}
                  <RazorpayPurchaseButton
                    creator={creator}
                    cost={PRICE[currency].opt1.value}
                    title={PRICE[currency].opt1.text}
                  />
                  <RazorpayPurchaseButton
                    creator={creator}
                    cost={PRICE[currency].opt2.value}
                    title={PRICE[currency].opt2.text}
                  />
                  <RazorpayPurchaseButton
                    creator={creator}
                    cost={PRICE[currency].opt3.value}
                    title={PRICE[currency].opt3.text}
                  />
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    className="bg-cultureGray text-cultureWhite h-[45px] border-cultureBeige border-2 rounded px-4 py-2 w-full"
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                  />
                  {tipAmount !== null && tipAmount > 0 && (
                    <RazorpayPurchaseButton
                      creator={creator}
                      cost={tipAmount}
                    />
                  )}
                </div>
              )}
              {currency == "USD" && (
                <div className="flex flex-col items-start p-8 space-y-4">
                  {/* Custom amount input */}
                  <StripePurchase
                    creator={creator}
                    cost={PRICE[currency].opt1.value}
                    title={PRICE[currency].opt1.text}
                  />
                  <StripePurchase
                    creator={creator}
                    cost={PRICE[currency].opt2.value}
                    title={PRICE[currency].opt2.text}
                  />
                  <StripePurchase
                    creator={creator}
                    cost={PRICE[currency].opt3.value}
                    title={PRICE[currency].opt3.text}
                  />

                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    className="bg-cultureGray text-cultureWhite h-[45px] border-cultureBeige border-2 rounded px-4 py-2 w-full"
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                  />
                  {tipAmount !== null && tipAmount > 0 && (
                    <StripePurchase creator={creator} cost={tipAmount} />
                  )}
                </div>
              )}
              {currency == "USDC" && (
                <div className="flex flex-col items-start p-8 space-y-4">
                  {/* Custom amount input */}
                  <CopperXButton
                    creator={creator}
                    cost={PRICE[currency].opt1.value}
                    title={PRICE[currency].opt1.text}
                  />
                  <CopperXButton
                    creator={creator}
                    cost={PRICE[currency].opt2.value}
                    title={PRICE[currency].opt2.text}
                  />
                  <CopperXButton
                    creator={creator}
                    cost={PRICE[currency].opt3.value}
                    title={PRICE[currency].opt3.text}
                  />
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    className="bg-cultureGray text-cultureWhite h-[45px] border-cultureBeige border-2 rounded px-4 py-2 w-full"
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                  />
                  {tipAmount !== null && tipAmount > 0 && (
                    <CopperXButton
                      creator={creator}
                      cost={PRICE[currency].opt3.value}
                    />
                  )}
                </div>
              )}
            </div>
          </motion.main>
        </div>
      )}
    </AnimatePresence>
  );
}

export default TipModal;
