"use client";
import TopNav from "@/components/navigation/topNav";
import React from "react";
import { Users } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { useAuthContext } from "@/app/providers/AuthContextProvider";
import CultureLoader from "@/components/common/cultureLoader";
import BottomNav from "@/components/navigation/bottomNav";

function CreatorProfile() {
  const User = useAuthContext();

  return (
    <>
      {User ? (
        <div className="flex flex-col w-full h-svh bg-black max-w-mobile mx-auto ">
          <TopNav className="z-50" />
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
            className="flex flex-col z-10 pt-[270px] h-full"
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
          </div>
          <BottomNav />
        </div>
      ) : (
        <CultureLoader />
      )}
    </>
  );
}

export default CreatorProfile;
