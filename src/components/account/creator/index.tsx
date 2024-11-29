"use client";
/* eslint-disable @next/next/no-img-element */
import TopNav from "@/components/navigation/topNav";
import React, { useState } from "react";
import { ChevronLeft, EditIcon, Plus, ShareIcon, Users } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { useAuthContext } from "@/app/providers/AuthContextProvider";
import CultureLoader from "@/components/common/cultureLoader";
import BottomNav from "@/components/navigation/bottomNav";
import SellForm from "@/components/products/SellForm/SellForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProductData } from "@/types";
import ProductCard from "@/components/products/Cards/ProductCard";
import EditProfile from "@/components/profile/edit-profile/editProfile";
import EmptyStateCreatorStore from "@/app/profile/[id]/emptyState";
import DigitalCard from "@/components/profile/cards/DigitalCard";
import MiniTicket from "../user/MiniTicket";
import DetailedView from "@/components/products/DetailedView";

function CreatorProfile() {
  const User = useAuthContext();
  const [openForm, setopenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedPane, setselectedPane] = useState<
    "FEED" | "SHOP" | "EVENTS" | "VAULT"
  >("FEED");
  const [selectedSubPane, setSelectedSubPane] = useState<
    "POSTS" | "ACTIVITY" | "DIGITAL" | "PHYSICAL" | "COLLECTION" | "TICKETS"
  >("POSTS");
  const [detailedView, setdetailedView] = useState(false);
  const [productDataForDetailedView, setProductDataForDetailedView] =
    useState<IProductData>();

  const handleDetailedView = async (product: IProductData) => {
    setProductDataForDetailedView(product);
    setdetailedView(true);
  };

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

  const statsQuery = useQuery({
    queryKey: ["get-creator-stats", User?._id],
    queryFn: async () => {
      const res = await axios.get(
        `/backend/user/get-creator-stats/${User?._id}`
      );
      return res.data as {
        followerCount: number;
        memberCount: number;
        productCount: number;
      };
    },
    enabled: Boolean(User?._id),
  });

  //fetch user-owned products
  const purchaseListQuery = useQuery({
    queryKey: ["purchase", User?._id],
    queryFn: async () => {
      const res = await axios.get(
        `/backend/product-purchase/user/${User?._id}`
      );
      return res.data;
    },
    enabled: Boolean(User?._id),
  });

  return (
    <>
      {User ? (
        <div className="flex flex-col w-full h-svh bg-black max-w-mobile mx-auto">
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
            className="flex flex-col z-10 pt-[270px] h-full relative overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex w-full text-white px-4 flex-col mb-1 ">
                <span>
                  <div className="flex">{User.name}</div>
                </span>
                <span className="text-xs text-cultureBeige">
                  <p>{User.username}</p>
                </span>
              </div>
              <div className="flex flex-col items-center pr-4 justify-end gap-2">
                <button
                  onClick={() => {
                    setOpenEditForm(!openEditForm);
                  }}
                >
                  <EditIcon className="text-cultureWhite" size={18} />
                </button>
                <ShareIcon className="text-cultureWhite" size={18} />
              </div>
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
            <div className="flex w-full px-4">
              <button
                className={`flex flex-auto border-b-2 border-current text-center justify-center ${
                  selectedPane == "FEED"
                    ? "text-cultureOrange border-cultureOrange"
                    : "text-cultureWhite"
                }`}
                onClick={() => {
                  setselectedPane("FEED");
                  setSelectedSubPane("POSTS");
                }}
              >
                Feed
              </button>
              <button
                className={`flex flex-auto border-b-2 border-current text-center justify-center ${
                  selectedPane == "SHOP"
                    ? "text-cultureOrange border-cultureOrange"
                    : "text-cultureWhite"
                }`}
                onClick={() => {
                  setselectedPane("SHOP");
                  setSelectedSubPane("DIGITAL");
                }}
              >
                Shop
              </button>
              <button
                className={`flex flex-auto border-b-2 border-current text-center justify-center ${
                  selectedPane == "EVENTS"
                    ? "text-cultureOrange border-cultureOrange"
                    : "text-cultureWhite"
                }`}
                onClick={() => {
                  setselectedPane("EVENTS");
                }}
              >
                Events
              </button>
              <button
                className={`flex flex-auto border-b-2 border-current text-center justify-center ${
                  selectedPane == "VAULT"
                    ? "text-cultureOrange border-cultureOrange"
                    : "text-cultureWhite"
                }`}
                onClick={() => {
                  setselectedPane("VAULT");
                  setSelectedSubPane("COLLECTION");
                }}
              >
                My Vault
              </button>
            </div>
            {selectedPane === "FEED" && products.isSuccess && (
              <div className="flex flex-col items-center mt-4">
                {/* Sub-pane buttons */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelectedSubPane("POSTS")}
                    className={`${
                      selectedSubPane === "POSTS"
                        ? "text-cultureOrange bg-cultureGray"
                        : "text-[#cac4bf] bg-[#2E2F32]"
                    } px-4 py-2 font-groteskRegular h-fit rounded-l-lg text-sm`}
                  >
                    Posts
                  </button>
                  <button
                    onClick={() => setSelectedSubPane("ACTIVITY")}
                    className={`${
                      selectedSubPane === "ACTIVITY"
                        ? "text-cultureOrange bg-cultureGray"
                        : "text-[#cac4bf] bg-[#2E2F32]"
                    } px-4 py-2 font-groteskRegular h-fit rounded-r-lg text-sm`}
                  >
                    Activity
                  </button>
                </div>

                {/* Sub-pane content */}
                <div className="flex items-center gap-4 flex-col w-full py-4 mb-16">
                  {/* Render posts */}
                  {selectedSubPane === "POSTS" &&
                    (products.data && products.data.length > 0 ? (
                      products.data.map((dc, idx) => (
                        <ProductCard product={dc} key={`dc-${idx}`} />
                      ))
                    ) : (
                      <EmptyStateCreatorStore
                        message="Start posting your work!"
                        subMessage="Your product posts will show up here."
                      />
                    ))}
                  {/* Render activity */}
                  {selectedSubPane === "ACTIVITY" && (
                    <EmptyStateCreatorStore message="Activity coming soon!" />
                  )}
                </div>
              </div>
            )}
            {selectedPane === "SHOP" && products.isSuccess && (
              <div className="flex flex-col items-center mt-4">
                {/* Sub-pane buttons */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelectedSubPane("DIGITAL")}
                    className={`${
                      selectedSubPane === "DIGITAL"
                        ? "text-cultureOrange bg-cultureGray"
                        : "text-[#cac4bf] bg-[#2E2F32]"
                    } px-4 py-2 font-groteskRegular h-fit rounded-l-lg text-sm`}
                  >
                    Digital
                  </button>
                  <button
                    onClick={() => setSelectedSubPane("PHYSICAL")}
                    className={`${
                      selectedSubPane === "PHYSICAL"
                        ? "text-cultureOrange bg-cultureGray"
                        : "text-[#cac4bf] bg-[#2E2F32]"
                    } px-4 py-2 font-groteskRegular h-fit rounded-r-lg text-sm`}
                  >
                    Physical
                  </button>
                </div>

                {/* Sub-pane content */}
                <div className="flex items-center gap-4 flex-col w-full py-4 mb-16">
                  {/* Render digital products */}
                  {selectedSubPane === "DIGITAL" &&
                    (products.data &&
                    products.data.filter((dc) => dc.productType === "digital")
                      .length > 0 ? (
                      products.data
                        .filter((dc) => dc.productType === "digital")
                        .map((dc, idx) => (
                          <ProductCard product={dc} key={`dc-${idx}`} />
                        ))
                    ) : (
                      <EmptyStateCreatorStore message="Your digital products will show up here." />
                    ))}

                  {/* Render physical products */}
                  {selectedSubPane === "PHYSICAL" &&
                    (products.data &&
                    products.data.filter((dc) => dc.productType === "physical")
                      .length > 0 ? (
                      products.data
                        .filter((dc) => dc.productType === "physical")
                        .map((dc, idx) => (
                          <ProductCard product={dc} key={`dc-${idx}`} />
                        ))
                    ) : (
                      <EmptyStateCreatorStore message="Your physical products will show up here." />
                    ))}
                </div>
              </div>
            )}
            {selectedPane === "EVENTS" && products.isSuccess && (
              <div className="flex flex-col items-center mt-4">
                <div className="flex items-center gap-4 flex-col w-full py-4 mb-16">
                  {products.data &&
                  products.data.filter((dc) => dc.productType === "event")
                    .length > 0 ? (
                    products.data
                      .filter((dc) => dc.productType === "event")
                      .map((dc, idx) => (
                        <ProductCard product={dc} key={`dc-${idx}`} />
                      ))
                  ) : (
                    <EmptyStateCreatorStore message="Your events will show up here." />
                  )}
                </div>
              </div>
            )}
            {selectedPane === "VAULT" && purchaseListQuery.isSuccess && (
              <div className="flex flex-col items-center mt-4">
                {/* Sub-pane buttons */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelectedSubPane("COLLECTION")}
                    className={`${
                      selectedSubPane === "COLLECTION"
                        ? "text-cultureOrange bg-cultureGray"
                        : "text-[#cac4bf] bg-[#2E2F32]"
                    } px-4 py-2 font-groteskRegular h-fit rounded-l-lg text-sm`}
                  >
                    My Collection
                  </button>
                  <button
                    onClick={() => setSelectedSubPane("TICKETS")}
                    className={`${
                      selectedSubPane === "TICKETS"
                        ? "text-cultureOrange bg-cultureGray"
                        : "text-[#cac4bf] bg-[#2E2F32]"
                    } px-4 py-2 font-groteskRegular h-fit rounded-r-lg text-sm`}
                  >
                    My Tickets
                  </button>
                </div>

                {/* Sub-pane content */}
                <div className="flex flex-wrap w-full justify-center p-4 gap-4 mb-36">
                  {selectedSubPane == "COLLECTION" &&
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
                  {detailedView && (
                    <DetailedView
                      product={productDataForDetailedView!}
                      onClose={() => setdetailedView(false)}
                    />
                  )}
                  {selectedSubPane == "TICKETS" &&
                    (purchaseListQuery.data.filter(
                      (f: { _id: string; productId: IProductData }) =>
                        f.productId.productType == "event"
                    ).length > 0 ? (
                      purchaseListQuery.data
                        .filter(
                          (f: { _id: string; productId: IProductData }) =>
                            f.productId.productType == "event"
                        )
                        .map(
                          (ele: { _id: string; productId: IProductData }) => {
                            return (
                              <MiniTicket
                                creatorName={ele.productId.creator.name}
                                post={ele.productId}
                                key={ele._id}
                              />
                            );
                          }
                        )
                    ) : (
                      <EmptyStateCreatorStore
                        message="Start attending events!"
                        subMessage="Tickets you collect will show up here."
                      />
                    ))}
                </div>
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
                <EditProfile profile={User!} />
              </div>
            </div>
          )}
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
