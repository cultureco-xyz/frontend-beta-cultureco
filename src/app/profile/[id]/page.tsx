"use client";
/* eslint-disable @next/next/no-img-element */
import TopNav from "@/components/navigation/topNav";
import React, { useState } from "react";
import { Users } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";

import CultureLoader from "@/components/common/cultureLoader";
import BottomNav from "@/components/navigation/bottomNav";
// import SellForm from "@/components/products/SellForm/SellForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProductData, UserData } from "@/types";
import { useParams } from "next/navigation";
import DigitalCard from "@/components/products/Cards/ProductCard";
import { Button } from "@/components/ui/button";
import TipJar from "@/assets/svgs/tip-jar";

import { create } from "zustand";
import { useAuthenticated } from "@/hooks/useAuthenticated";
import VerifiedIcon from "@/assets/svgs/verified_icon";
import { motion } from "framer-motion";
import CloseIcon from "@/assets/svgs/close.icon";
import TipModal from "@/components/profile/TippingModal";
import TribeModal from "@/components/profile/TribeModal";

interface IProfileData {
  isFollowing: boolean;
  isMember: boolean;
}

interface IProfileStore extends IProfileData {
  setStoreData: (label: keyof IProfileData, value: boolean) => void;
}

const useStore = create<IProfileStore>()((set) => ({
  isFollowing: false,
  isMember: false,
  setStoreData: (label: keyof IProfileData, value: boolean) => {
    set({ [label]: value });
  },
}));

const profileMethods = {
  followUser: async (followerID: string, follwingID: string) => {
    const res = await axios.post("/backend/follow/follow", {
      followerId: followerID,
      followingId: follwingID,
    });
    if (res.status == 200) {
      return true;
    }
  },
  unfollowUser: async (followerID: string, followingID: string) => {
    const res = await axios.delete("/backend/follow/unfollow", {
      data: {
        followerId: followerID,
        followingId: followingID,
      },
    });
    if (res.status == 200) {
      return true;
    }
  },
  joinTribe: async (followerID: string, follwingID: string) => {
    const res = await axios.post("/backend/follow/become-member", {
      followerId: followerID,
      followingId: follwingID,
    });
    if (res.status == 200) {
      return true;
    }
  },
};

function Profile() {
  const params = useParams();
  // const [openForm, setopenForm] = useState(false);
  const { isLogedIn, user: authData } = useAuthenticated();
  const store = useStore();
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  const [isTippingOpen, setisTippingOpen] = useState(false);
  const [isTribeModalOpen, setisTribeModalOpen] = useState(false);

  const userQuery = useQuery({
    queryKey: ["get-user", params.id],
    queryFn: async () => {
      const res = await axios.post(`/backend/user/get-user-by-id`, {
        userID: params.id,
      });
      return res.data;
    },
    enabled: Boolean(params.id),
  });

  const followQuery = useQuery({
    queryKey: ["follow-query", isLogedIn],
    queryFn: async () => {
      const res = await axios.post("/backend/follow/follow-status", {
        creatorId: userQuery.data._id,
      });
      if (res.status == 200) {
        store.setStoreData("isFollowing", res.data.isFollowing);
        store.setStoreData("isMember", res.data.isMember);
      }
      return res.data;
    },
    enabled: isLogedIn && userQuery.isSuccess,
  });

  const products = useQuery({
    queryKey: ["get-user-products", params.id],
    queryFn: async () => {
      const res = await axios.get(
        `/backend/product/get-user-products/${userQuery.data._id}`
      );
      return res.data as IProductData[];
    },
    enabled: Boolean(userQuery.isSuccess),
  });

  const statsQuery = useQuery({
    queryKey: ["get-creator-stats", params.id],
    queryFn: async () => {
      const res = await axios.get(
        `/backend/user/get-creator-stats/${params.id}`
      );
      return res.data as {
        followerCount: number;
        memberCount: number;
        productCount: number;
      };
    },
    enabled: Boolean(params.id),
  });

  const User = userQuery.isSuccess ? (userQuery.data as UserData) : undefined;

  const toggleAboutPopup = () => {
    setIsAboutPopupOpen(!isAboutPopupOpen);
  };

  return (
    <>
      {User ? (
        <div className="flex flex-col w-full h-svh bg-black max-w-mobile mx-auto overflow-y-auto">
          <TopNav />
          <TipModal
            isOpen={isTippingOpen}
            close={() => {
              setisTippingOpen(false);
            }}
            creator={authData?._id as string}
            user="132"
          />
          <TribeModal
            isOpen={isTribeModalOpen}
            close={() => {
              setisTribeModalOpen(false);
            }}
            member_of={params.id as string}
            creatorName={User.name}
            creatorProfilePic={User.profilePicture}
            user={authData?._id as string}
          />
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
            <div className="flex w-full text-white px-4 flex-col mb-1">
              <span>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <div className="font-groteskBold capitalize text-xl mr-1">
                      {User.name}
                    </div>
                    <VerifiedIcon fillColor="#fe621d" />
                    {!store.isFollowing ? (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={async () => {
                          if (!isLogedIn) {
                            return (location.href = "/auth/signin");
                          }
                          if (authData) {
                            const res = await profileMethods.followUser(
                              `${authData._id}`,
                              `${User._id}`
                            );
                            if (res) {
                              store.setStoreData("isFollowing", true);
                              followQuery.refetch();
                            }
                          }
                        }}
                        className="bg-cultureWhite text-black font-groteskSemiBold p-1 text-xs h-6 w-14 rounded-md ml-2 hover:text-cultureOrange"
                      >
                        Follow
                      </motion.button>
                    ) : (
                      <Button
                        className="bg-cultureGray text-cultureOrange font-groteskSemiBold p-1 text-xs h-6 w-20 rounded-md ml-2"
                        onClick={async () => {
                          if (!isLogedIn) {
                            return (location.href = "/auth/signin");
                          }
                          if (authData) {
                            const res = await profileMethods.unfollowUser(
                              `${authData._id}`,
                              `${User._id}`
                            );
                            if (res) {
                              store.setStoreData("isFollowing", false);
                              followQuery.refetch();
                            }
                          }
                        }}
                      >
                        Following
                      </Button>
                    )}
                  </div>
                  <motion.button
                    onClick={toggleAboutPopup}
                    whileTap={{ scale: 0.9 }}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-cultureOrange text-cultureGray text-sm font-groteskSemiBold"
                  >
                    i
                  </motion.button>
                </div>
                {/* "About" Pop-up */}
                {isAboutPopupOpen && (
                  <motion.div
                    className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div
                      className="bg-cultureGray w-full h-[calc(85vh-90px)] rounded-t-xl p-4 relative z-50 overflow-hidden"
                      style={{
                        maxHeight: "calc(85vh - 90px)",
                        marginBottom: "50px",
                      }}
                    >
                      <motion.button
                        onClick={toggleAboutPopup}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4 flex items-center justify-center rounded-full text-gray-400 font-groteskSemiBold"
                      >
                        <CloseIcon />
                      </motion.button>
                      {/* About Section Content */}
                      <div className="p-4 h-full overflow-auto">
                        <h2 className="text-xl font-groteskSemiBold text-gray-400 mb-4">
                          About
                        </h2>
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                            {User.profilePicture ? (
                              <img
                                src={User.profilePicture}
                                alt="Creator Store Logo"
                                className="w-16 h-16 rounded-full object-cover"
                                width={96}
                                height={96}
                              />
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                                <span className="text-2xl text-white">
                                  {User.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-lg font-groteskMedium">
                              {User.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              {User.creatorType}
                            </p>
                          </div>
                        </div>
                        <p className="text-white">{User.bio}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </span>
              <span className="text-xs text-cultureBeige">
                <p>{User.creatorType}</p>
              </span>
            </div>
            <div className="flex justify-between text-white px-4 text-[14px] mb-4">
              <span className="flex gap-1 items-center">
                <Users className="text-white h-6 w-4" />
                <p className="font-groteskSemiBold">
                  {statsQuery.data?.followerCount || 0}
                </p>
                <p>fans</p>
              </span>
              <span className="flex gap-1 items-center">
                <CultureCoLogoIcon fillColor={"white"} size={20} />
                <p className="font-groteskSemiBold">
                  {statsQuery.data?.memberCount || 0}
                </p>
                <p>Paid Members</p>
              </span>
              <span className="flex gap-1 items-center">
                <p className="font-groteskSemiBold">
                  {statsQuery.data?.productCount || 0}
                </p>
                <p>Posts</p>
              </span>
            </div>
            <div className="flex w-full justify-between px-4 gap-3 mb-6">
              {!store.isMember ? (
                <Button
                  onClick={async () => {
                    if (!isLogedIn) {
                      return (location.href = "/auth/signin");
                    }
                    setisTribeModalOpen(true);
                    // if (authData) {
                    //   const res = await profileMethods.joinTribe(
                    //     `${authData._id}`,
                    //     `${User._id}`
                    //   );
                    //   if (res) {
                    //     store.setStoreData("isMember", true);
                    //     followQuery.refetch();
                    //   }
                    // }
                  }}
                  className="bg-cultureOrange h-[52px] rounded-xl w-2/3 text-base text-cultureGray font-groteskBold"
                >
                  <CultureCoLogoIcon fillColor="#282B28" size={17} /> Join the
                  tribe
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setisTippingOpen(true);
                  }}
                  className="bg-cultureGray rounded-xl text-cultureOrange h-[52px] w-2/3 text-base font-groteskBold"
                >
                  <TipJar />
                  Tip
                </Button>
              )}
              {!store.isMember ? (
                <Button
                  onClick={() => {
                    setisTippingOpen(true);
                  }}
                  className="bg-cultureGray h-[52px] w-1/3 rounded-xl text-cultureOrange font-groteskBold text-base"
                >
                  <TipJar />
                  Tip
                </Button>
              ) : (
                <div className=" h-[52px] w-1/3 flex gap-2 items-center justify-center bg-cultureGray text-cultureBeige py-2 rounded-xl font-groteskSemiBold">
                  <CultureCoLogoIcon size={17} fillColor="#CAC5BF" />
                  Tribe
                </div>
              )}
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
            {/* <div className="right-0 left-0 fixed bottom-40  shadow-2xl z-50  w-full h-0 max-w-mobile mx-auto bg-red-200">
              <span
                onClick={() => {
                  setopenForm(true);
                }}
                className="cursor-pointer flex w-16 h-16 rounded-full bg-cultureOrange items-center justify-center shadow-2xl ml-auto mr-4"
              >
                <Plus className="w-10 h-10" />
              </span>
            </div> */}
          </div>
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

export default Profile;
