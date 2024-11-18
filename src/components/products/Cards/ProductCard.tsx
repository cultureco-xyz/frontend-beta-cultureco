"use client";
import React, { useState } from "react";

import { PiFireLight } from "react-icons/pi";
import { MessageSquare, Share } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { GoArrowRight } from "react-icons/go";
import { Digital } from "../SellForm/icons";
import { IProductData } from "@/types";
import DetailedView from "../DetailedView";
import DigitalFrame from "../SellForm/frames/DigitalFrame";
import {
  TDigitalProductFormats,
  TEventProductFormats,
  TPhysicalProductFormats,
} from "../SellForm/config";
import { DigitalAudioFrame } from "../SellForm/frames/DigitalAudioFrame";
import PhyiscalFrame from "../SellForm/frames/PhyiscalFrame";
import { VinylPhysicalFrame } from "../SellForm/frames/VinylPhysicalFrame";
import { TicketFrame } from "../SellForm/frames/TicketFrame";
import { useAuthenticated } from "@/hooks/useAuthenticated";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

function ProductCard({ product }: { product: IProductData }) {
  const params = useParams();
  const queryClient = useQueryClient();
  const { isLogedIn, user: authData } = useAuthenticated();
  const isAdminUser = authData?.email.endsWith("@cultureco.xyz");

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/backend/product/delete/${product._id}`);
    },
    onSuccess: () => {
      // Invalidate the "get-user-products" query to refetch and update the product list
      queryClient.invalidateQueries({
        queryKey: ["get-user-products", params.id],
      });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  // Function to display edit product pop-up for admin
  const handleEditProductPopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setIsEditFormOpen(true);
  };

  // Function to display confirmation pop-up for product deletion by admin
  const handleConfirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowDeleteConfirm(true);
  };

  // Function to actually delete the product
  const handleDeleteProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteProductMutation.mutate(product._id);
    setShowDeleteConfirm(false);
  };

  // Function to cancel the delete action
  const handleCancelDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const { imageURL: image, title, memberPrice, regularPrice } = product;
  const [detailedView, setdetailedView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setdetailedView(true);
        }}
        className="h-[480px] w-[360px] relative text-cultureWhite"
      >
        {product.productFormat == TDigitalProductFormats.DIGITAL_ART && (
          <DigitalFrame image={image + "#" + title} key={image + title} />
        )}
        {product.productFormat == TDigitalProductFormats.MUSIC && (
          <DigitalAudioFrame
            imageUrl={image + "#" + title}
            key={image + title}
            className=""
          />
        )}
        {product.productFormat == TPhysicalProductFormats.PRINT && (
          <PhyiscalFrame
            imageUrl={image + "#" + title}
            key={image + title}
            className=""
          />
        )}
        {product.productFormat == TPhysicalProductFormats.APPAREL && (
          <PhyiscalFrame
            imageUrl={image + "#" + title}
            key={image + title}
            className=""
          />
        )}
        {product.productFormat == TPhysicalProductFormats.VINYL && (
          <VinylPhysicalFrame
            imageUrl={image + "#" + title}
            key={image + title}
            className=""
          />
        )}
        {product.productFormat == TEventProductFormats.IRL_EVENT && (
          <TicketFrame
            imageUrl={image + "#" + title}
            key={image + title}
            className=""
          />
        )}
        {product.productFormat == TEventProductFormats.VIRTUAL_EVENT && (
          <TicketFrame
            imageUrl={image + "#" + title}
            key={image + title}
            className=""
          />
        )}

        {/* Top-most details */}
        <div className="top-4 px-4 absolute flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center justify-center gap-1 bg-cultureGray text-digitalArtYellow w-24 h-8 rounded-md text-xs text-nowrap font-groteskRegular">
            <Digital /> Digital Art
          </div>
          {/* <div className="flex flex-row items-center justify-center gap-1 bg-cultureGray w-24 h-8 rounded-md text-xs text-nowrap">
          <CountdownTimer
            fanLimit={post.productId.fanlimit}
            textColor="#FFB800"
          />
        </div> */}
        </div>
        {/* Comment, like, share options */}
        <div className="absolute right-4 top-[45%] transform -translate-y-1/2 flex flex-col items-end gap-4">
          <span className="flex gap-1 items-center cursor-pointer">
            <p className="text-xs">{0}</p>
            <PiFireLight
              style={{
                color: true ? "#FE621D" : "white",
              }}
              className="text-2xl"
            />
          </span>
          <span className="flex gap-1 items-center">
            <p className="text-xs">{0}</p>
            <MessageSquare />
          </span>
          <span className="flex flex-row justify-end w-full">
            <Share />
          </span>
        </div>
        {/* Details */}
        <div className="flex justify-between py-4 px-4 flex-col w-full h-fit absolute bottom-0">
          <div className="flex justify-between w-full">
            {/* Left side: Profile Picture, Username, Description, and Date */}
            <div className="flex flex-col">
              <div className="flex items-center text-xl font-groteskSemiBold pt-10">
                {title}
              </div>
              <div className="flex flex-row items-center justify-center gap-1 bg-cultureGray text-digitalArtYellow w-20 h-6 my-3 rounded-md text-xs text-nowrap font-groteskSemiBold">
                {0} collected
              </div>
              {/* Date */}
              <p className="text-xs text-cultureBeige">
                <GetDate date={`${new Date()}`} />
              </p>
              {/* Admin edit/delete for products */}
              {isAdminUser && (
                <>
                  <div className="flex flex-row gap-2 mt-2">
                    <button
                      className="bg-cultureGray text-cultureOrange rounded-md w-12 h-8 items-center justify-center flex font-groteskSemiBold"
                      onClick={(e) => handleEditProductPopup(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-cultureRed text-black rounded-md w-16 h-8 items-center justify-center flex font-groteskSemiBold"
                      onClick={(e) => handleConfirmDelete(e)}
                    >
                      Delete
                    </button>
                  </div>
                  {showDeleteConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
                      <div className="bg-cultureGray p-4 rounded-md w-80 flex flex-col items-center">
                        <p className="text-cultureWhite text-center mb-4">
                          Are you sure you want to delete this product?
                        </p>
                        <div className="flex gap-4">
                          <button
                            className="bg-cultureRed text-black px-4 py-2 rounded-md font-groteskSemiBold"
                            onClick={(e) => handleDeleteProduct(e)}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-cultureWhite text-black px-4 py-2 rounded-md font-groteskSemiBold"
                            onClick={(e) => handleCancelDelete(e)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* TO-DO: Edit product functionality and UI for Admin */}
                  {isEditFormOpen && <>Edit</>}
                </>
              )}
            </div>

            {/* Right side: Pricing Info */}
            <div className="flex flex-col justify-center items-end">
              <div className="flex text-cultureWhite w-[60px] h-[60px] flex-col items-center justify-center border-2 rounded-md mb-4 z-50">
                <GoArrowRight />
                <span>{!true ? "Buy" : "View"}</span>
              </div>
              {true && (
                <>
                  <span className="flex items-center gap-1">
                    <CultureCoLogoIcon fillColor="#fe621d" size={24} />
                    <h1 className="font-groteskBold text-cultureOrange text-[24px]">
                      ₹{memberPrice}
                    </h1>
                  </span>
                  <p className="text-xs text-cultureBeige">
                    <strong className="text-base">₹{regularPrice}</strong>{" "}
                    Regular
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {detailedView && <DetailedView product={product} />}
    </>
  );
}

const GetDate = ({ date }: { date: string }) => {
  const createdAt = new Date(date);
  const now = new Date();
  const timeDiff = now.getTime() - createdAt.getTime();

  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  let formattedDate: string;

  if (minutesDiff < 60) {
    // Less than an hour
    formattedDate = `${minutesDiff} minute${minutesDiff !== 1 ? "s" : ""} ago`;
  } else if (hoursDiff < 24) {
    // Less than a day
    formattedDate = `${hoursDiff} hour${hoursDiff !== 1 ? "s" : ""} ago`;
  } else if (daysDiff < 7) {
    // Less than a week
    formattedDate = `${daysDiff} day${daysDiff !== 1 ? "s" : ""} ago`;
  } else {
    // More than a week
    formattedDate = createdAt.toLocaleDateString();
  }

  return <>{formattedDate}</>;
};

export default ProductCard;
