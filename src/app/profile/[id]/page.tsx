"use client";
/* eslint-disable @next/next/no-img-element */
import TopNav from "@/components/navigation/topNav";
import React, { useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";

import CultureLoader from "@/components/common/cultureLoader";
import BottomNav from "@/components/navigation/bottomNav";
import SellForm from "@/components/products/SellForm/SellForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProductData, UserData } from "@/types";
import { useParams } from "next/navigation";
import DigitalCard from "@/components/products/Cards/DigitalCard";
import { Button } from "@/components/ui/button";
import TipJar from "@/assets/svgs/tip-jar";

import { create } from "zustand";
import { useAuthenticated } from "@/hooks/useAuthenticated";

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
  const [openForm, setopenForm] = useState(false);
  const [authData, setauthData] = useState<UserData>();
  const isLogedIn = useAuthenticated();
  const store = useStore();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const authData = JSON.parse(auth) as UserData;
      setauthData(authData);
    }
  }, []);

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

  const User = userQuery.isSuccess ? (userQuery.data as UserData) : undefined;
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
                <div className="flex font-groteskBold capitalize">
                  {User.name}
                  {!store.isFollowing ? (
                    <Button
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
                      className="bg-cultureWhite  text-cultureGray p-1 text-xs h-6 ml-2 hover:text-cultureOrange"
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button className="bg-cultureGray text-cultureOrange p-1 text-xs h-6 ml-2">
                      Following
                    </Button>
                  )}
                </div>
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
            <div className="flex w-full px-4 gap-4 mb-6">
              {!store.isMember ? (
                <Button
                  onClick={async () => {
                    if (!isLogedIn) {
                      return (location.href = "/auth/signin");
                    }
                    if (authData) {
                      const res = await profileMethods.joinTribe(
                        `${authData._id}`,
                        `${User._id}`
                      );
                      if (res) {
                        store.setStoreData("isMember", true);
                        followQuery.refetch();
                      }
                    }
                  }}
                  className="bg-cultureOrange h-[52px] w-[261px] text-base font-groteskBold"
                >
                  <CultureCoLogoIcon fillColor="#282B28" /> Join the tribe
                </Button>
              ) : (
                <Button className="bg-cultureGray text-cultureOrange h-[52px] w-[261px] text-base font-groteskBold">
                  <CultureCoLogoIcon fillColor="#282B28" /> Member
                </Button>
              )}
              <Button className="bg-cultureGray h-[52px] w-[84px] text-cultureOrange font-groteskBold text-base">
                <TipJar />
                Tip
              </Button>
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
            <div className="right-0 left-0 fixed bottom-40  shadow-2xl z-50  w-full h-0 max-w-mobile mx-auto bg-red-200">
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

export default Profile;
