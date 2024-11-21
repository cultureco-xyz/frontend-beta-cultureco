/* eslint-disable @next/next/no-img-element */
"use client";
import CommentCrusaderBadge from "@/components/profile/profile-badges/Comment Crusader";
import CrossCollectorBadge from "@/components/profile/profile-badges/Cross Collector";
import GoingSteadyBadge from "@/components/profile/profile-badges/Going Steady";
import TribeFounderBadge from "@/components/profile/profile-badges/TribeFounder";
import { ShareIcon } from "lucide-react";
import React from "react";
import { GrDiamond } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
import TopNav from "@/components/navigation/topNav";
import BottomNav from "@/components/navigation/bottomNav";
import { useAuthenticated } from "@/hooks/useAuthenticated";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProductData } from "@/types";
import DigitalCard from "@/components/profile/cards/DigitalCard";

function UserProfile() {
  const { user, isLogedIn } = useAuthenticated();

  //fetch stats
  const statsQuery = useQuery({
    queryKey: ["user-stats", user?._id],
    queryFn: async () => {
      const res = await axios.get(`/backend/user/get-user-stats/${user?._id}`);
      return res.data as {
        followingCount: string;
        tribesCount: string;
        productCount: string;
        badgesCount: string;
      };
    },
    enabled: Boolean(user?._id),
  });

  //fetch user cards
  const purchaseListQuery = useQuery({
    queryKey: ["purchase", user?._id],
    queryFn: async () => {
      const res = await axios.get(
        `/backend/product-purchase/user/${user?._id}`
      );
      return res.data;
    },
    enabled: Boolean(isLogedIn),
  });

  return (
    <div className="flex flex-col w-full h-svh px-4  max-w-mobile mx-auto overflow-y-auto pt-[70px]">
      <TopNav />
      <div className="flex items-center justify-between ">
        <div className="flex items-start">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-cultureOrange flex items-center justify-center">
              <span className="h-full w-full flex items-center justify-center rounded-full bg-cultureOrange  text-4xl font-bold text-black">
                {user?.name.slice()[0]}
              </span>
            </div>
          )}
          <div className="ml-2">
            <p className="text-cultureWhite text-lg font-groteskSemiBold flex items-center gap-1">
              {user?.name}
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
              @{user?.username}
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
          {user?.bio}
        </p>
      </div>
      {/* Profile Stats */}
      <div className="flex justify-between text-cultureWhite mb-1">
        <div className="flex flex-row items-center space-x-1">
          <TbUsers size={20} />
          <p className="text-sm font-groteskSemiBold">
            {statsQuery.data?.tribesCount || 0}
          </p>
          <p className="font-groteskRegular text-xs">
            {true ? "Tribe" : "Tribes"}
          </p>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <GrDiamond size={20} />
          <p className="text-sm font-groteskSemiBold">
            {purchaseListQuery.data?.length || 0}
          </p>
          <p className="font-groteskRegular text-xs">Collected</p>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <MdOutlineShield size={20} />
          <p className="text-sm font-groteskSemiBold">
            {statsQuery.data?.badgesCount || 0}
          </p>
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
      <div className="flex flex-wrap w-full justify-center gap-4 mt-8">
        {purchaseListQuery.isSuccess &&
          purchaseListQuery.data.map(
            (ele: { _id: string; productId: IProductData }) => {
              return (
                <DigitalCard imageUrl={ele.productId.imageURL} key={ele._id} />
              );
            }
          )}
      </div>
      <BottomNav className="fixed bottom-0 w-full max-w-mobile " />
    </div>
  );
}

export default UserProfile;
