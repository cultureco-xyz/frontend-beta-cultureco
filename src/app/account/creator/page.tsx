"use client";
/* eslint-disable @next/next/no-img-element */
import TopNav from "@/components/navigation/topNav";
import React, { useState } from "react";
import { Plus, Users } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { useAuthContext } from "@/app/providers/AuthContextProvider";
import CultureLoader from "@/components/common/cultureLoader";
import BottomNav from "@/components/navigation/bottomNav";
import SellForm from "@/components/products/SellForm/SellForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProductData } from "@/types";

import DigitalCard from "@/components/products/Cards/DigitalCard";

function CreatorProfile() {
  const User = useAuthContext();
  const [openForm, setopenForm] = useState(false);

  const products = useQuery({
    queryKey: ["get-user-products", User?._id],
    queryFn: async () => {
      const res = await axios.get(
        `/backend/product/get-user-products/${User?._id}`
      );
      return res.data as IProductData[];
    },
    enabled: Boolean(User?._id),
  });

  return (
    <>
      {User ? (
        <div className="flex flex-col w-full h-svh bg-black max-w-mobile mx-auto overflow-y-auto">
          <TopNav />
          <img
            className="absolute w-full max-w-mobile mx-auto"
            src={User.profilePicture}
            alt=""
          />
          <div
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 54%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)",
            }}
            className="flex flex-col z-10 pt-[270px] h-full relative"
          >
            <div className="flex w-full  text-white px-4 flex-col mb-1 ">
              <span>
                <div className="flex">{User.name}</div>
              </span>
              <span className="text-xs text-cultureBeige">
                <p>{User.username}</p>
              </span>
            </div>
            <div className="flex justify-between text-white px-4 text-[14px] mb-4">
              <span className="flex gap-1 items-center">
                <Users className="text-white h-6 w-4" />
                <p className="font-groteskSemiBold">1.3k</p>
                <p>fans</p>
              </span>
              <span className="flex gap-1 items-center">
                <CultureCoLogoIcon fillColor={"white"} size={20} />
                <p className="font-groteskSemiBold">800</p>
                <p>Paid Members</p>
              </span>
              <span className="flex gap-1 items-center">
                <p className="font-groteskSemiBold">4</p>
                <p>Posts</p>
              </span>
            </div>
            <div className="flex w-full px-4">
              <span className="flex flex-auto border-b-2 border-current text-cultureOrange text-center justify-center">
                Feed
              </span>
              <span className="flex flex-auto border-b-2 border-current text-cultureBeige text-center justify-center">
                Shop
              </span>
              <span className="flex flex-auto border-b-2 border-current text-cultureBeige text-center justify-center">
                Events
              </span>
            </div>
            {products.isSuccess && (
              <div className="flex flex-col w-full   items-center my-4 gap-4 pb-24 h-fit">
                {products.data.map((dc, idx) => {
                  return React.cloneElement(
                    <DigitalCard product={dc} key={"dc" + idx} />
                  );
                })}
              </div>
            )}
            {/* Sell form button */}
            <div className="right-0 left-0 fixed bottom-40  shadow-2xl z-50  w-full h-0 max-w-mobile mx-auto ">
              <span
                onClick={() => {
                  setopenForm(true);
                }}
                className="cursor-pointer flex w-16 h-16 rounded-full bg-cultureOrange items-center justify-center shadow-2xl ml-auto mr-4"
              >
                <Plus className="w-10 h-10" />
              </span>
            </div>
          </div>
          {/* sell form */}
          {openForm && (
            <SellForm
              close={() => {
                setopenForm(false);
              }}
            />
          )}
          <BottomNav className="fixed bottom-0 w-full max-w-mobile " />
        </div>
      ) : (
        <div className="flex flex-col w-full h-svh items-center justify-center">
          <CultureLoader />
        </div>
      )}
    </>
  );
}

export default CreatorProfile;
