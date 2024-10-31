"use client";
import React, { useEffect, useState } from "react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { motion } from "framer-motion";
import Intro from "./intro";
import { Button } from "../../components/ui/button";
import ProductTypes from "./productTypes";
import Quote from "./quote";
import { ChevronDown, Instagram, Link, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

//build fix 22 23v24

const handleCreatorClick = () => {
  window.open("https://forms.gle/VyuLm8ZxChtMmK2T7", "_blank");
};

function Landing() {
  const [enableContent, setenableContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setenableContent(true);
    }, 2000);
  }, []);

  return (
    <div className="max-w-[430px] mx-auto">
      <Intro />
      {enableContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col w-full relative z-10  pb-12"
        >
          <div className="flex flex-col w-full h-[100svh] ">
            <motion.div className="flex mt-4 justify-center items-center font-fredokaSemiBold text-cultureOrange text-3xl">
              <CultureCoLogoIcon fillColor="#ECECEC" size={42} />
              <span className="relative">
                <h1 className="text-cultureWhite">CultureCo</h1>
                <span className="text-black absolute right-[15px] bottom-0 -rotate-[8deg] bg-cultureOrange w-[30px] flex items-center justify-center text-[10px] font-groteskSemiBold rounded-lg">
                  Beta
                </span>
              </span>
            </motion.div>
            <h1 className="text-cultureOrange text-center text-xl font-groteskBold w-[75%] mx-auto mt-6">
              The all-in-one platform for Creators and Fans
            </h1>
            <img
              className="w-auto mx-auto mt-auto h-[25svh] "
              src="/landingv3/collage.png"
              alt=""
            />
            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
              }}
              className="flex  flex-col w-full max-w-[361px] p-5 py-8 h-[304px] rounded-2xl mx-auto backdrop-blur-[30px] relative -top-5"
            >
              <h1 className="text-center text-cultureWhite font-groteskBold  leading-5 min-w-full w-full">
                Welcome to CultureCo - where independent artists thrive, & fans
                dive deeper into the culture they love.
              </h1>
              <p className="text-cultureOrange mt-4 mx-auto font-groteskRegular text-base">
                One platform. Endless possibilities.
              </p>
              <div className="flex flex-col w-full items-center gap-2 mt-auto">
                <Button
                  onClick={() => {
                    location.href = `/auth/signin`;
                  }}
                  className="bg-cultureOrange w-full h-[50px] hover:text-cultureOrange hover:bg-cultureGrayVariant"
                >
                  ENTER
                </Button>

                <Button
                  onClick={handleCreatorClick}
                  variant={"outline"}
                  className="text-cultureOrange h-[50px] w-full bg-[#2E2F32] hover:text-cultureBeige hover:border-cultureBeige"
                >
                  Apply to Become a Creator
                </Button>
              </div>
            </div>
            <span className="relative font-groteskRegular mt-2 -top-5 flex w-full items-center justify-center">
              <p className="text-sm">Scroll </p>
              <motion.span
                animate={{ y: [5, 0, 5, 0, 5] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <ChevronDown />
              </motion.span>
            </span>
          </div>
          <div className="flex flex-col w-full font-groteskRegular max-w-[361px]  min-h-32 bg-[#282B28] mx-auto rounded-2xl px-4 py-8">
            <h1 className="text-cultureOrange font-groteskBold mx-auto">
              Unified Creator Platform
            </h1>
            <p className="text-[#FFF] text-base mx-auto mb-6">
              Everything you Need - All in One Place
            </p>
            <ProductTypes />
            <h1 className="text-cultureOrange font-groteskBold mx-auto mt-16 text-xl">
              Exclusive Memberships
            </h1>
            <p className="text-[#FFF] text-base mx-auto ">
              Build Tribes with Exclusive Perks
            </p>
            <img
              src="/landingv3/membershipModal.png"
              className="w-full "
              alt=""
            />
            <h1 className="text-cultureOrange font-groteskBold mx-auto text-xl">
              Collector Profiles & Achievements
            </h1>
            <p className="text-[#FFF] text-base mx-auto ">
              Showcase and Share Your Passion.
            </p>
            <img
              src="/landingv3/profileAchivement.png"
              className="mt-4"
              alt=""
            />
            <h1 className="text-cultureOrange font-groteskBold mx-auto text-xl mt-12">
              Support Creators Your Way
            </h1>
            <p className="text-[#FFF] text-base mx-auto text-center">
              Flexible payment options - UPI, USD, and even crypto
            </p>
            <img src="/landingv3/payment.png" className="mt-2" alt="" />
            <h1 className="text-cultureOrange font-groteskBold mx-auto text-xl ">
              Authentic Culture Collectibles
            </h1>
            <p className="text-[#FFF] text-base mx-auto text-center">
              The next generation of art collecting, with blockchain-backed
              authenticity
            </p>
            <img src="/landingv3/base.png" className="mt-8" alt="" />
          </div>
          <div className="flex flex-col w-full items-center gap-2 mt-6 max-w-[361px] mx-auto ">
            <Button
              onClick={() => {
                location.href = `/auth/user/sign-in`;
              }}
              className="bg-cultureOrange w-full h-[50px] hover:text-cultureOrange hover:bg-cultureGrayVariant"
            >
              ENTER
            </Button>

            <Button
              variant={"outline"}
              className="text-cultureOrange h-[50px] w-full bg-[#2E2F32] hover:text-cultureBeige hover:border-cultureBeige"
              onClick={handleCreatorClick}
            >
              Apply to Become a Creator
            </Button>
          </div>
          <div className="flex flex-col font-groteskRegular">
            {[
              {
                text: ` Wow, I can put out my daily art drops and build a paying
                    community out of it. Can we also make a virtual exhibition
                    some day where I can launch artists using my platform?`,
                name: "Prasad Bhat",
                artType: "Artist / Comedian",
                url: "https://dkrwjr7mnvu4o.cloudfront.net/user/66f15fd69e0b47ad4bca74b2/profilePic/1898e29a-1407-412f-899f-c85aa49f2967",
              },
              {
                text: `I used to make music for others thinking it had to be good, but now I can just drop anything I like for my community. And I don’t even have to just drop music, I can drop art too!`,
                name: "Brute",
                artType: "Musician",
                url: "https://dkrwjr7mnvu4o.cloudfront.net/user/66f15b5305b166b17844f4bf/profilePic/596ca7d1-3c70-42d0-94b8-505000c56f20",
              },
              {
                text: `I think it’s awesome that this is being built for Indian creators. We normally have to use a western platform and our fans keep asking if we can pay in Rupees. This is really needed, full power to you.`,
                name: "Deepakshi",
                artType: "Artist",
                url: "https://dkrwjr7mnvu4o.cloudfront.net/user/66f15fd69e0b47ad4bca74b2/profilePic/5f159057-6d0d-4a7f-b762-6197b23f6073",
              },
            ].map((ele) => {
              return (
                <span
                  key={ele.name}
                  className="flex flex-col max-w-[361px] mx-auto bg-[#2E2F32] w-full mt-8 p-6 rounded-xl"
                >
                  <Quote />
                  <p className="text-white mt-2 text-[14px]">{ele.text}</p>
                  <span className="flex items-center gap-2 mt-4">
                    <img
                      src={ele.url}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="flex flex-col gap-1">
                      <h1 className="text-cultureWhite text-xs">{ele.name}</h1>
                      <p className="text-cultureWhite text-[10px]">
                        {ele.artType}
                      </p>
                    </span>
                  </span>
                </span>
              );
            })}
          </div>
          <span className=" flex flex-col gap-4 max-w-[361px] mx-auto bg-[#2E2F32] w-full mt-8 p-6 rounded-xl font-groteskMedium ">
            <Button
              onClick={() => {
                location.href = "https://cultureco.substack.com/";
              }}
              variant={"outline"}
              className="text-white text-xs hover:text-cultureOrange"
            >
              <Mail className="mr-2 h-5" />
              Letters From The Founder
            </Button>
            <Button
              variant={"outline"}
              className="text-white text-xs hover:text-cultureOrange"
              onClick={() => {
                location.href = "https://docs.cultureco.xyz/";
              }}
            >
              <Link className="mr-2 h-5" />
              Learn more about CultureCo
            </Button>
            <span className="flex items-center mx-auto gap-4">
              <Instagram
                onClick={() => {
                  location.href = "https://www.instagram.com/cultureco.xyz/";
                }}
                className="text-white"
              />
              <FaXTwitter
                onClick={() => {
                  location.href = "https://x.com/cultureco_xyz";
                }}
                className="text-white h-6 w-6"
              />
            </span>
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default Landing;
