import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MdSort, MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { Bug, LogOut, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { UserData } from "@/types";
import Link from "next/link";
import ApplyToBeCreatorIcon from "@/assets/apply-creator-icon";
import { useRouter } from "next/navigation";

function TopNav({ className }: { className?: string }) {
  const [navOpen, setnavOpen] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user) as UserData;
      const domain = userData.email.split("@")[1];
      if (domain == "cultureco.xyz") {
        setisAdmin(true);
      }
    }
  }, [navOpen]);

  return (
    <div
      style={{
        background: navOpen
          ? "linear-gradient(180deg, #282B28 0%, #000 82.5%)"
          : "",
        height: navOpen ? "100svh" : "fit",
      }}
      className={twMerge(
        `flex flex-col text-white fixed top-0  max-w-mobile w-full mx-auto left-0 right-0 max-h-fit z-[200]`,
        className
      )}
    >
      <div className="p-4 flex justify-between w-full items-center h-fit">
        <div
          className="flex flex-row mt-1 justify-center items-center h-fit"
          onClick={() => router.push("/")}
        >
          <CultureCoLogoIcon fillColor="#fff" size={24} />
          <span className="bg-digitalMusicGreen text-black font-groteskSemiBold text-[8px] rounded-md w-[30px] text-center">
            Beta
          </span>
        </div>
        <button
          onClick={() => {
            window.open("https://t.me/+tUElUGKkjd41YmE1", "_blank");
          }}
          className="text-white ml-auto mr-2 pr-3 px-[4px] gap-[2px] flex items-center justify-center text-[8px] h-[32px] border border-white rounded-[8px]"
        >
          <Bug className="h-3" />
          Report Bugs
        </button>
        {navOpen ? (
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <MdClose
              onClick={() => {
                setnavOpen(!true);
              }}
              className="text-white h-8 w-8"
            />
          </motion.span>
        ) : (
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <MdSort
              onClick={() => {
                setnavOpen(true);
              }}
              className="text-white h-8 w-8 scale-x-[-1]"
            />
          </motion.span>
        )}
      </div>
      {navOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex flex-col w-full h-full  p-4"
        >
          {isAdmin && (
            <Link
              href={"/auth/signin?step=create-demo"}
              className="flex gap-3 font-groteskSemiBold"
            >
              <UserPlus /> Create Demo Creator Profile
            </Link>
          )}
          <div className="flex flex-col w-full mt-auto gap-8">
            <span
              onClick={() => {
                axios.get("/backend/auth/logout").then((res) => {
                  if (res.status == 200) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("splash-complete");
                    location.href = "/";
                  }
                });
              }}
              className="flex gap-3 font-groteskBold"
            >
              <LogOut /> Sign Out
            </span>
            <Button
              onClick={() => {
                location.href = "/auth/signin?step=apply";
              }}
              className="bg-cultureWhite text-black font-groteskBold text-base h-[52px] mb-8"
            >
              <ApplyToBeCreatorIcon size={20} fillColor="#000000" /> Apply To
              Become A Creator
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default TopNav;
