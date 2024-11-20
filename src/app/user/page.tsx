"use client";
import CommentCrusaderBadge from "@/components/common/profile-badges/Comment Crusader";
import CrossCollectorBadge from "@/components/common/profile-badges/Cross Collector";
import GoingSteadyBadge from "@/components/common/profile-badges/Going Steady";
import TribeFounderBadge from "@/components/common/profile-badges/TribeFounder";
import { ShareIcon } from "lucide-react";
import React from "react";
import { GrDiamond } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { ChevronRight } from "lucide-react";
import TopNav from "@/components/navigation/topNav";
import BottomNav from "@/components/navigation/bottomNav";

// fetch user details
// fetch their collection
// tickets
// stats

function page() {
  return (
    <div className="flex flex-col w-full h-svh px-4  max-w-mobile mx-auto overflow-y-auto pt-[70px]">
      <TopNav />
      <div className="flex items-center justify-between ">
        <div className="flex items-start">
          {true ? (
            <img
              src={"/grad-bg.png"}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-cultureOrange flex items-center justify-center">
              <span className="h-full w-full flex items-center justify-center rounded-full bg-cultureOrange  text-4xl font-bold text-black">
                J
              </span>
            </div>
          )}
          <div className="ml-2">
            <p className="text-cultureWhite text-lg font-groteskSemiBold flex items-center gap-1">
              {"John swaroop"}{" "}
              {false && (
                <button
                  onClick={() => {
                    location.href =
                      "https://testnets.opensea.io/0xAa0fC67C3d8F6a24bb717733c22f2665CCBbca1E";
                  }}
                >
                  <img src="/images/opensea.svg" alt="" />
                </button>
              )}
            </p>
            <p className="text-cultureBeige text-xs font-groteskRegular">
              @{"sum"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <button>{/* <CreatorEdit fillColor="#f1f5ed" /> */}</button>
          <ShareIcon />
        </div>
      </div>
      {/* Bio */}
      <div>
        <p className="mb-2 text-sm text-cultureWhite font-groteskRegular overflow-y-auto max-h-14">
          {"bio"}
        </p>
      </div>
      {/* Profile Stats */}
      <div className="flex justify-between text-cultureWhite mb-1">
        <div className="flex flex-row items-center space-x-1">
          <TbUsers size={20} />
          <p className="text-sm font-groteskSemiBold">{2}</p>
          <p className="font-groteskRegular text-xs">
            {2 === 1 ? "Tribe" : "Tribes"}
          </p>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <GrDiamond size={20} />
          <p className="text-sm font-groteskSemiBold">{3}</p>
          <p className="font-groteskRegular text-xs">Collected</p>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <MdOutlineShield size={20} />
          <p className="text-sm font-groteskSemiBold">55</p>
          <p className="font-groteskRegular text-xs">Badges</p>
        </div>
      </div>
      <div className="flex flex-col mt-2 p-2 w-full h-fit bg-cultureGrayVariant rounded-md">
        <div className="text-cultureBeige text-sm font-groteskSemiBold">
          Achievements
        </div>
        <div className="flex flex-row">
          <TribeFounderBadge />
          <GoingSteadyBadge />
          <CommentCrusaderBadge />
          <CrossCollectorBadge />
        </div>
      </div>
      <BottomNav className="fixed bottom-0 w-full max-w-mobile " />
    </div>
  );
}

export default page;
