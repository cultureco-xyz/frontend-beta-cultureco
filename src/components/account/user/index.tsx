/* eslint-disable @next/next/no-img-element */
"use client";
import CommentCrusaderBadge from "@/components/profile/profile-badges/Comment Crusader";
import CrossCollectorBadge from "@/components/profile/profile-badges/Cross Collector";
import GoingSteadyBadge from "@/components/profile/profile-badges/Going Steady";
import TribeFounderBadge from "@/components/profile/profile-badges/TribeFounder";
import { ShareIcon, EditIcon, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { GrDiamond } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
import TopNav from "@/components/navigation/topNav";
import BottomNav from "@/components/navigation/bottomNav";
import { useAuthenticated } from "@/hooks/useAuthenticated";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProductData } from "@/types";
import EditProfile from "@/components/profile/edit-profile/editProfile";
import MiniTicket from "./MiniTicket";
import DigitalCard from "@/components/profile/cards/DigitalCard";
import DetailedView from "@/components/products/DetailedView";
import EmptyStateCreatorStore from "@/app/profile/[id]/emptyState";

function UserProfile() {
  const { user, isLogedIn } = useAuthenticated();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [detailedView, setdetailedView] = useState(false);
  const [productDataForDetailedView, setProductDataForDetailedView] =
    useState<IProductData>();
  const [selectedPane, setselectedPane] = useState<"COLLECTION" | "TICKETS">(
    "COLLECTION"
  );

  const handleDetailedView = async (product: IProductData) => {
    setProductDataForDetailedView(product);
    setdetailedView(true);
  };

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
      <div className="flex items-center justify-between">
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
          <button
            onClick={() => {
              setOpenEditForm(!openEditForm);
            }}
          >
            <EditIcon className="text-cultureWhite" />
          </button>
          <ShareIcon className="text-cultureWhite" />
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
      <div className="flex flex-wrap w-full justify-center gap-4 mt-8 mb-36">
        <div className="flex justify-between w-full font-groteskRegular text-md h-8 my-4 mt-0 text-white">
          <span
            onClick={() => {
              setselectedPane("COLLECTION");
            }}
            style={{
              borderBottom:
                selectedPane == "COLLECTION"
                  ? "1px solid #FE621D"
                  : "1px solid white",
            }}
            className="flex w-full items-center justify-center "
          >
            <p>My Collection</p>
          </span>
          <span
            onClick={() => {
              setselectedPane("TICKETS");
            }}
            style={{
              borderBottom:
                selectedPane == "TICKETS"
                  ? "1px solid #FE621D"
                  : "1px solid white",
            }}
            className="flex w-full items-center justify-center"
          >
            <p>My Tickets</p>
          </span>
        </div>
        {selectedPane == "COLLECTION" &&
          purchaseListQuery.isSuccess &&
          (purchaseListQuery.data.length > 0 ? (
            purchaseListQuery.data.map(
              (ele: { _id: string; productId: IProductData }) => {
                return (
                  <div
                    onClick={() => handleDetailedView(ele.productId)}
                    key={ele._id}
                  >
                    <DigitalCard
                      imageUrl={ele.productId.imageURL}
                      key={ele._id}
                    />
                  </div>
                );
              }
            )
          ) : (
            <EmptyStateCreatorStore
              message="Start building your collection!"
              subMessage="Items you collect will show up here."
            />
          ))}
        {selectedPane == "TICKETS" &&
          purchaseListQuery.isSuccess &&
          (purchaseListQuery.data.filter(
            (f: { _id: string; productId: IProductData }) =>
              f.productId.productType == "event"
          ).length > 0 ? (
            purchaseListQuery.data
              .filter(
                (f: { _id: string; productId: IProductData }) =>
                  f.productId.productType == "event"
              )
              .map((ele: { _id: string; productId: IProductData }) => {
                return (
                  <MiniTicket
                    creatorName={ele.productId.creator.name}
                    post={ele.productId}
                    key={ele._id}
                  />
                );
              })
          ) : (
            <EmptyStateCreatorStore
              message="Start attending events!"
              subMessage="Tickets you collect will show up here."
            />
          ))}
      </div>
      {detailedView && (
        <DetailedView
          product={productDataForDetailedView!}
          onClose={() => setdetailedView(false)}
        />
      )}
      <BottomNav className="fixed bottom-0 w-full max-w-mobile " />
      {openEditForm && (
        <div className="fixed top-0 left-0 bg-black/80 h-[100vh] w-full z-[1001] flex items-center justify-center overflow-y-auto">
          <div className="h-fit p-4 w-[90vw] bg-cultureGray rounded-md relative">
            <span className="flex w-full text-cultureWhite -mb-6 mt-4">
              <span
                className="flex items-center h-fit text-base"
                onClick={() => {
                  setOpenEditForm(!openEditForm);
                }}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </span>
            </span>
            <EditProfile profile={user!} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
