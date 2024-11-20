"use client";
import React, { useState } from "react";

import { PiFireLight } from "react-icons/pi";
import { MessageSquare, Share } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { GoArrowRight } from "react-icons/go";
import { IProductData } from "@/types";
import DetailedView from "../DetailedView";
import DigitalFrame from "../SellForm/frames/DigitalFrame";
import {
  DigitalProductTypes,
  EventProductTypes,
  PhysicalProductTypes,
  TDigitalProductFormats,
  TEventProductFormats,
  TPhysicalProductFormats,
} from "../SellForm/config";
import { DigitalAudioFrame } from "../SellForm/frames/DigitalAudioFrame";
import PhyiscalFrame from "../SellForm/frames/PhyiscalFrame";
import { VinylPhysicalFrame } from "../SellForm/frames/VinylPhysicalFrame";
import { TicketFrame } from "../SellForm/frames/TicketFrame";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthenticated } from "@/hooks/useAuthenticated";

function ProductCard({ product }: { product: IProductData }) {
  const { imageURL: image, title, memberPrice, regularPrice } = product;
  const [detailedView, setdetailedView] = useState(false);
  const { isLogedIn, user } = useAuthenticated();

  const statsQuery = useQuery({
    queryKey: ["get-stats", product._id],
    queryFn: async () => {
      const res = await axios.post("/backend/product/get-product-stats", {
        productId: product._id,
        userId: isLogedIn ? user?._id : undefined,
      });
      if (res.status == 200) {
        return res.data;
      }
    },
  });

  return (
    <>
      <div
        onClick={() => {
          setdetailedView(true);
        }}
        className="h-[480px] w-[360px] relative text-cultureWhite "
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
          <div>
            {[
              ...DigitalProductTypes,
              ...PhysicalProductTypes,
              ...EventProductTypes,
            ]
              .filter((ele) => ele.title == product.productFormat)
              .map((prd, key) => {
                const Icon = prd.icon;
                return (
                  <span
                    style={{
                      boxShadow: "0px 0px 4px 0px #5F5F5F",
                    }}
                    className="flex p-2 rounded-lg items-center text-xs capitalize gap-1 bg-cultureGray"
                    key={prd.title + key}
                  >
                    <Icon />
                    <p
                      style={{
                        color: prd.color,
                      }}
                    >
                      {prd.title}
                    </p>
                  </span>
                );
              })}
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
            <p className="text-xs">{statsQuery.data?.likeCount || 0}</p>
            <PiFireLight
              key={statsQuery.isSuccess + product._id}
              style={
                statsQuery.isSuccess ? { color: "#FE621D" } : { color: "white" }
              }
              className="text-2xl"
            />
          </span>
          <span className="flex gap-1 items-center">
            <p className="text-xs">{statsQuery.data?.commentCount || 0} </p>
            <MessageSquare />
          </span>
          <span className="flex flex-row justify-end w-full">
            <Share />
          </span>
        </div>
        {/* Details */}
        <div className="flex rounded-2xl justify-between py-4 px-4 flex-col w-full h-fit absolute bottom-0 ">
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
