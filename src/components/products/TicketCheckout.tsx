import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import TribeFounder from "../profile/profile-badges/TribeFounder";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { FaLock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TicketCheckoutFlow = ({
  showCheckout,
  setShowCheckout,
  memberPrice,
  productID,
  actualPrice,
  isMember,
  openPurchase,
  setCost,
}: {
  showCheckout: boolean;
  setShowCheckout: (st: boolean) => void;
  memberPrice: number;
  productID: string;
  actualPrice: string;
  isMember: boolean;
  openPurchase: () => void;
  setCost: (c: number) => void;
}) => {
  const [steps, setsteps] = useState(0);
  const [ticketCount, setticketCount] = useState(1);
  const [joining, setjoining] = useState("");

  useEffect(() => {
    setsteps(0);
  }, []);

  const artists = useQuery({
    queryKey: [productID],
    queryFn: async () => {
      const res = await axios.get("/backend/user/get-all-creators");
      return res.data;
    },
    enabled: Boolean(productID),
  });

  return (
    <>
      {showCheckout && (
        <motion.div
          initial={{
            y: "100%",
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: "100%",
          }}
          className="flex py-2 flex-col rounded-t-lg fixed left-0 right-0 bottom-0 max-w-[430px] w-full mx-auto bg-[#282B28] min-h-[300px] h-fit  z-[100] bottom-[56px]"
        >
          <div className="flex w-full border-b border-white">
            <Button
              onClick={() => {
                setShowCheckout(false);
              }}
              className="font-groteskMedium text-sm w-fit"
            >
              <ChevronLeft className="h-[19px]" />
              Cancel
            </Button>
          </div>
          {steps == 0 && (
            <div className="flex font-groteskRegular flex-col p-3">
              <h1>Choose a ticket</h1>
              <div className="flex flex-col  mt-2   w-full gap-4">
                <span className="flex justify-between  rounded-md w-full opacity-65 p-2 border-white border-2">
                  <TribeFounder />
                  <span className="flex flex-col">
                    <h1 className="text-sm font-groteskBold">
                      Tribe Founder&apos;s Presale
                    </h1>
                    <span className="flex flex-col text-[10px]">
                      <p>Age Limit - 21+</p>
                      <p>Only for Tribe Founder Badge Holders</p>
                    </span>
                  </span>
                  <span className="flex flex-col items-end">
                    <h1>Sold Out!</h1>
                    <p>₹999</p>
                  </span>
                </span>
                <span
                  onClick={() => {
                    if (isMember) {
                      setsteps(2);
                    } else {
                      setsteps(1);
                    }
                  }}
                  className="flex justify-between  rounded-md w-full p-2 px-4 border-white border-2"
                >
                  <CultureCoLogoIcon fillColor="white" size={40} />
                  <span className="flex flex-col text-xs">
                    <h1 className="text-sm font-groteskBold">
                      Tribe Member Early Access
                    </h1>
                    <span className="flex flex-col text-[10px] ">
                      <p>Age Limit - 21+</p>
                      <p>Only for Tribe Members of Either</p>
                      <p>Brute or Studio Tenkai </p>
                      <span className="flex mx-auto mt-1 text-xs items-center font-groteskBold">
                        <p>Sale ends in</p>
                        <div className="flex ml-1 items-center gap-1">
                          <p>23</p>
                          <span className="text-[8px]">H</span>32
                          <span className="text-[8px]">M</span>
                          <p>56</p>
                          <span className="text-[8px]">S</span>
                        </div>
                      </span>
                    </span>
                  </span>
                  <span className="flex flex-col items-end">
                    <p>₹{memberPrice}</p>
                    <FaLock className="mt-1 h-6" />
                  </span>
                </span>
                <span className="flex flex-col rounded-md w-full p-2 px-4 border-white border-2">
                  <span className="flex justify-between opacity-65 ">
                    <span className="flex flex-col text-xs">
                      <h1 className="text-sm font-groteskBold">Fan</h1>
                      <span className="flex flex-col text-[10px] ">
                        <p>Age Limit - 21+</p>
                        <p>Only for Tribe Members of Either</p>
                        <p>Brute or Studio Tenkai </p>
                      </span>
                    </span>
                    <span className="flex flex-col items-end">
                      <p>₹{actualPrice}</p>
                      <FaLock className="mt-1 h-6" />
                    </span>
                  </span>
                  <span className="flex mx-auto mt-1 text-xs items-center font-groteskBold">
                    <p>Sale ends in</p>
                    <div className="flex ml-1 items-center gap-1">
                      <p>23</p>
                      <span className="text-[8px]">H</span>32
                      <span className="text-[8px]">M</span>
                      <p>56</p>
                      <span className="text-[8px]">S</span>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          )}
          {steps == 1 && (
            <div className="flex flex-col w-full font-groteskBold p-4">
              <h1 className="mb-4">
                Join a Tribe to get access to this ticket
              </h1>
              {artists.isSuccess && (
                <span
                  onClick={() => {
                    setjoining(artists.data.creator.username);
                    setsteps(2);
                  }}
                  className="flex items-center mb-4 gap-2"
                >
                  <img
                    src={
                      artists.isSuccess ? artists.data.creator.profilePic : ""
                    }
                    className="object-cover w-[78px] h-[78px] border border-white rounded-md"
                    alt=""
                  />
                  <h1>
                    Join {artists.isSuccess && artists.data.creator.name} Tribe
                  </h1>
                </span>
              )}

              {artists.isSuccess && artists.data.collaborator && (
                <span
                  onClick={() => {
                    setjoining(artists.data.collaborator?.username as string);
                    setsteps(2);
                  }}
                  className="flex gap-2 items-center"
                >
                  <img
                    src={
                      artists.isSuccess
                        ? artists.data.collaborator.profilePic
                        : ""
                    }
                    className="object-cover w-[78px] h-[78px] border border-white rounded-md"
                    alt=""
                  />
                  <h1>Join {artists.data.collaborator.name} Tribe</h1>
                </span>
              )}
            </div>
          )}
          {steps == 2 && (
            <div className="flex flex-col w-full font-groteskBold p-4 gap-4">
              <div className="flex items-center justify-between">
                <span className="flex flex-col w-[200px]">
                  <h1 className="text-base">Brute Strength</h1>
                  <p className="text-xs font-groteskLight">
                    Tribe Member Early Access Ticket
                  </p>
                </span>

                <span className="flex h-[46px] gap-2">
                  <span
                    onClick={() => {
                      if (ticketCount > 1) {
                        setticketCount((tc: number) => tc - 1);
                      }
                    }}
                    className="cursor-pointer rounded-md border border-white flex items-center justify-center h-full w-[34px]"
                  >
                    -
                  </span>
                  <h1 className="rounded-md border w-[46px] border-white flex items-center justify-center h-full">
                    {ticketCount}
                  </h1>
                  <span
                    onClick={() => {
                      setticketCount((tc: number) => tc + 1);
                    }}
                    className="cursor-pointer rounded-md border border-white flex items-center justify-center h-full w-[34px]"
                  >
                    +
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex flex-col w-[200px]">
                  <h1 className="text-base">Price</h1>
                  <p className="text-xs font-groteskLight">x2</p>
                </span>
                <span className="flex flex-col items-end">
                  <h1 className="text-xs font-groteskLight">₹{memberPrice}</h1>
                  <p className=" text-base ">₹{memberPrice * ticketCount}</p>
                </span>
              </div>
              {joining && (
                <div className="flex items-center justify-between">
                  <span className="flex flex-col w-[200px]">
                    <h1 className="text-base">Tribe Membership</h1>
                    <p className="text-xs font-groteskLight">
                      exclusive tribe member perks
                    </p>
                  </span>
                  <span className="flex flex-col items-end">
                    <p className=" text-base ">₹999</p>
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between mt-auto">
                <span className="flex flex-col w-[200px]">
                  <h1 className="text-base">Total Amount</h1>
                  <p className="text-xs font-groteskLight">
                    Inclusive of All Taxes
                  </p>
                </span>
                <span className="flex flex-col items-end">
                  <p className=" text-base ">
                    ₹
                    {joining
                      ? memberPrice * ticketCount + 999
                      : memberPrice * ticketCount}
                  </p>
                </span>
              </div>
              <Button
                onClick={() => {
                  const cost = joining
                    ? memberPrice * ticketCount + 999
                    : memberPrice * ticketCount;
                  setCost(cost);
                  setTimeout(() => {
                    openPurchase();
                  }, 10);
                }}
                variant={"outline"}
                className="text-cultureOrange w-full"
              >
                Checkout
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default TicketCheckoutFlow;
