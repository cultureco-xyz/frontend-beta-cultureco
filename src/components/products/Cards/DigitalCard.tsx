"use client";
import React from "react";

import { PiFireLight } from "react-icons/pi";
import { MessageSquare, Share } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { GoArrowRight } from "react-icons/go";
import { Digital } from "../SellForm/icons";

function DigitalCard({
  image,
  title,
  memberPrice,
  regularPrice,
}: {
  image: string;
  title: string;
  memberPrice: number;
  regularPrice: number;
}) {
  return (
    <div className="h-[480px] w-[360px] relative text-cultureWhite">
      <DigitalBG image={image + "#" + title} key={image + title} />
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
                  <strong className="text-base">₹{regularPrice}</strong> Regular
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
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

import { twMerge } from "tailwind-merge";
import { frame } from "framer-motion";
import axios from "axios";

const DigitalBG = ({
  className,
  image: imageurl,
}: {
  className?: string;
  image?: string;
}) => {
  const image = Math.random() * 1000;

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="361"
        height="480"
        fill="none"
        viewBox="0 0 361 480"
        className={twMerge(``, className)}
      >
        <mask id={`path-1-inside-1_${image}`} fill="#fff">
          <path
            fillRule="evenodd"
            d="M0 16v448h4v8h4v4h8v4h329v-4h8v-4h4v-8h4V16h-4V8h-4V4h-8V0H16v4H8v4H4v8z"
            clipRule="evenodd"
          ></path>
        </mask>
        <path
          fill={`url(#pattern0_${image})`}
          fillRule="evenodd"
          d="M0 16v448h4v8h4v4h8v4h329v-4h8v-4h4v-8h4V16h-4V8h-4V4h-8V0H16v4H8v4H4v8z"
          clipRule="evenodd"
        ></path>
        <path
          fill={`url(#paint0_linear_${image})`}
          fillRule="evenodd"
          d="M0 16v448h4v8h4v4h8v4h329v-4h8v-4h4v-8h4V16h-4V8h-4V4h-8V0H16v4H8v4H4v8z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#ECECEC"
          d="M0 16v-2h-2v2zm0 448h-2v2h2zm4 0h2v-2H4zm0 8H2v2h2zm4 0h2v-2H8zm0 4H6v2h2zm8 0h2v-2h-2zm0 4h-2v2h2zm329 0v2h2v-2zm0-4v-2h-2v2zm8 0v2h2v-2zm0-4v-2h-2v2zm4 0v2h2v-2zm0-8v-2h-2v2zm4 0v2h2v-2zm0-448h2v-2h-2zm-4 0h-2v2h2zm0-8h2V6h-2zm-4 0h-2v2h2zm0-4h2V2h-2zm-8 0h-2v2h2zm0-4h2v-2h-2zM16 0v-2h-2v2zm0 4v2h2V4zM8 4V2H6v2zm0 4v2h2V8zM4 8V6H2v2zm0 8v2h2v-2zm-6 0v448h4V16zm2 450h4v-4H0zm2-2v8h4v-8zm2 10h4v-4H4zm2-2v4h4v-4zm2 6h8v-4H8zm6-2v4h4v-4zm2 6h329v-4H16zm331-2v-4h-4v4zm-2-2h8v-4h-8zm10-2v-4h-4v4zm-2-2h4v-4h-4zm6-2v-8h-4v8zm-2-6h4v-4h-4zm6-2V16h-4v448zm-2-450h-4v4h4zm-2 2V8h-4v8zm-2-10h-4v4h4zm-2 2V4h-4v4zm-2-6h-8v4h8zm-6 2V0h-4v4zm-2-6H16v4h329zM14 0v4h4V0zm2 2H8v4h8zM6 4v4h4V4zm2 2H4v4h4zM2 8v8h4V8zm2 6H0v4h4z"
          mask={`url(#path-1-inside-1_${image})`}
        ></path>
        <defs>
          <linearGradient
            id={`paint0_linear_${image}`}
            x1="181"
            x2="180.5"
            y1="261.5"
            y2="480"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0"></stop>
            <stop offset="1"></stop>
          </linearGradient>
          <pattern
            id={`pattern0_${image}`}
            width="1"
            height="1"
            patternContentUnits="objectBoundingBox"
          >
            <use
              xlinkHref={`#image0_${image}`}
              transform="matrix(.00138 0 0 .00119 -.075 -.051)"
            ></use>
          </pattern>

          <image
            id={`image0_${image}`}
            width="832"
            height="928"
            preserveAspectRatio="xMidYMid slice"
            href={`${imageurl}`}
            className="object-cover"
          ></image>
        </defs>
      </svg>
    </div>
  );
};

export default DigitalCard;
