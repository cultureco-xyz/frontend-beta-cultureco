"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import CultureCoLogoIcon from "../../assets/svgs/culture-logo.icon";

import { AnimatePresence, motion } from "framer-motion";

import { GoHome } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
//laptop:hidden desktop:hidden mac:hidden fhd:hidden whd:hidden uhd:hidden

function BottomNav({ className }: { className?: string }) {
  const [currentPath, setcurrentPath] = useState<"home" | "feed" | "account">(
    "home"
  );

  useEffect(() => {
    const path = location.pathname;
    if (path && path == "/account/creator") {
      setcurrentPath("account");
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          duration: 1.5,
        }}
        className={twMerge(
          "h-[56px] px-4 flex justify-around items-center relative max-w-[430px] mx-auto w-full z-50 bg-black",
          className
        )}
      >
        <div className="absolute blur-sm mt-[2px] inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.8)] to-[rgba(50,50,50,0.7)]"></div>
        <div className="z-[1] flex justify-around items-center w-full">
          <Link href="/search">
            <CultureCoLogoIcon
              fillColor={currentPath == "feed" ? "#FE621D" : "#FFFFFF"}
            />
          </Link>
          <Link href="/">
            <GoHome
              style={{
                color: currentPath == "home" ? "#FE621D" : "#FFFFFF",
              }}
              className="text-white h-6 w-6"
            />
          </Link>
          <Link href={"/account/creator"}>
            <FaRegCircleUser
              style={{
                color: currentPath == "account" ? "#FE621D" : "#FFFFFF",
              }}
              className="text-white h-5 w-5"
            />
          </Link>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}

export default BottomNav;
