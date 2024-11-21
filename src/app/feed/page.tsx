"use client";
/* eslint-disable */
import { Story } from "@/components/feed/Story";
import BottomNav from "@/components/navigation/bottomNav";
import TopNav from "@/components/navigation/topNav";
import ProductCard from "@/components/products/Cards/ProductCard";
import { useAuthenticated } from "@/hooks/useAuthenticated";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import EmptyStateUserFeed from "./emptyState";

async function fetchAllCreators() {
  const { data } = await axios.get("/backend/user/get-all-creators");
  return data;
}

async function fetchFollowStatus(creatorId: string, userId: string) {
  const { data } = await axios.post("/backend/follow/follow-status", {
    creatorId,
  });
  return data;
}

async function fetchMemberCreators(userId: string) {
  const creators = await fetchAllCreators();
  const statuses = await Promise.all(
    creators.map((creator: UserData) =>
      fetchFollowStatus(creator._id as string, userId)
    )
  );
  return creators.filter(
    (creator: UserData, index: number) => statuses[index].isMember
  );
}

async function fetchFollowCreators(userId: string) {
  const creators = await fetchAllCreators();
  const statuses = await Promise.all(
    creators.map((creator: UserData) =>
      fetchFollowStatus(creator._id as string, userId)
    )
  );
  return creators.filter(
    (creator: UserData, index: number) => statuses[index].isFollowing
  );
}

const fetchProductsByCreator = async (creatorId: string) => {
  const response = await axios.get(
    `/backend/product/get-user-products/${creatorId}`
  );
  return response.data;
};

export default function UserFeed() {
  const { isLogedIn, user: authData } = useAuthenticated();

  const { data: memberCreators } = useQuery({
    queryKey: ["memberCreators", authData?._id],
    queryFn: () => fetchMemberCreators(authData?._id!),
    enabled: !!authData?._id,
  });

  const { data: followCreators } = useQuery({
    queryKey: ["followCreators", authData?._id],
    queryFn: () => fetchFollowCreators(authData?._id!),
    enabled: !!authData?._id,
  });

  const { data: allProducts } = useQuery({
    queryKey: ["followedProducts", followCreators],
    queryFn: async () => {
      if (!followCreators || followCreators.length === 0) return [];
      const productsPromises = followCreators.map((creator: UserData) =>
        fetchProductsByCreator(creator._id!)
      );

      const productsArrays = await Promise.all(productsPromises);

      // Flatten the results and sort by `createdAt`
      const allProducts = productsArrays.flat();
      return allProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    enabled: !!followCreators && followCreators.length > 0,
  });

  return (
    <>
      <TopNav />
      <div className="h-full w-full px-3 font-groteskRegular pt-4">
        <h1 className="text-xl font-groteskSemiBold text-[#F5F1ED99] mt-12">
          Your Tribes
        </h1>
        <div className="flex w-full gap-4 overflow-x-auto overflow-y-hidden py-4 border-b-[1px] border-b-cultureBeige mb-6">
          {memberCreators && memberCreators.length > 0 ? (
            memberCreators.map((ele: UserData, idx: number) => (
              <Story
                url={ele.profilePicture as string}
                text={ele.username}
                creatorId={ele._id!}
                key={"story" + ele.username + idx}
              />
            ))
          ) : (
            <div className="text-cultureBeige font-groteskSemiBold text-sm flex w-full items-center justify-center">
              Tribes you join will show up here!
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-6 text-white mb-32">
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((product) => {
              // // Find the corresponding creator status
              // const creatorStatus = creatorStatuses.find(
              //   (status) => String(status.creatorId) === String(post.creatorId)
              // );
              return <ProductCard isPurchased={false} product={product} />;
            })
          ) : (
            <EmptyStateUserFeed />
          )}
        </div>
      </div>
      <BottomNav className="fixed bottom-0 w-full max-w-mobile" />
    </>
  );
}
