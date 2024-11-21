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
import { useAuthenticated } from "@/hooks/useAuthenticated";
import TopNav from "../navigation/topNav";
import BottomNav from "../navigation/bottomNav";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SplashScreen from "../splashScreen/splashScreen";
import { IProductData, UserData } from "@/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FollowingIconForExplore from "@/assets/svgs/follow-icon-explore-page";
import ProductCard from "../products/Cards/ProductCard";
import DetailedView from "../products/DetailedView";
import CultureCoLoadingIcon from "@/assets/svgs/loading-cc";

//build fix 22 23v24

const handleCreatorClick = () => {
  window.open("https://forms.gle/VyuLm8ZxChtMmK2T7", "_blank");
};

const fetchCreators = async () => {
  const { data } = await axios.get<UserData[]>(
    "/backend/user/get-all-creators"
  );
  return data;
};

const fetchFollowStatus = async (creatorId: string, userId: string) => {
  const { data } = await axios.post("/backend/follow/follow-status", {
    creatorId,
    userId,
  });
  return data;
};

const fetchProducts = async () => {
  const { data } = await axios.get<IProductData[]>(
    "/backend/product/get-all-products"
  );
  return data;
};

function Landing() {
  const { isLogedIn, user: authData } = useAuthenticated();
  const [enableContent, setenableContent] = useState(false);
  const [splashOpen, setsplashOpen] = useState(true);
  const [detailedView, setdetailedView] = useState(false);
  const [productDataForDetailedView, setProductDataForDetailedView] =
    useState<IProductData>();
  const router = useRouter();

  const handleDetailedView = async (product: IProductData) => {
    setProductDataForDetailedView(product);
    setdetailedView(true);
  };

  const handleCreatorStoreClick = (creatorId: string) => {
    router.push(`/profile/${creatorId}`);
  };

  // Fetch all creators
  const { data: creators, isLoading: isCreatorsLoading } = useQuery({
    queryKey: ["creators"],
    queryFn: fetchCreators,
  });

  // Fetch follow statuses only after creators are loaded
  const { data: creatorsWithStatus, isLoading: isFollowStatusesLoading } =
    useQuery({
      queryKey: ["followStatuses", creators],
      queryFn: async () => {
        const promises = creators!.map((creator) =>
          fetchFollowStatus(creator._id as string, authData?._id as string)
        );
        const statuses = await Promise.all(promises);
        return creators!.map((creator, index) => ({
          ...creator,
          isFollowing: statuses[index].isFollowing,
          isMember: statuses[index].isMember,
        }));
      },
      enabled: !!creators, // Only fetch follow statuses after creators are available
    });

  // Fetch all products
  const { data: trendingProducts, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    setTimeout(() => {
      setenableContent(true);
    }, 2000);
  }, []);

  const creatorCarouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.7, // Show about 2.5 creators
    slidesToScroll: 1,
    autoplay: true, // Automatically scroll through the carousel
    autoplaySpeed: 3000, // Speed of the autoplay
  };

  const productCarouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show 1 product
    slidesToScroll: 1,
    autoplay: true, // Automatically scroll through the carousel
    autoplaySpeed: 3000, // Speed of the autoplay
    arrows: true,
    nextArrow: <button className="slick-arrow slick-next">Next</button>,
    prevArrow: <button className="slick-arrow slick-prev">Prev</button>,
  };

  if (isLogedIn) {
    if (isCreatorsLoading || isFollowStatusesLoading || isProductsLoading) {
      return (
        <div className="h-full my-auto w-full flex justify-center items-center">
          <CultureCoLoadingIcon />
        </div>
      );
    }
  }

  return (
    <div className="max-w-[430px] mx-auto">
      {isLogedIn ? (
        <div className="mt-20">
          <TopNav />
          <SplashScreen
            isOpen={splashOpen}
            close={() => {
              setsplashOpen(false);
            }}
          />
          {creatorsWithStatus && creatorsWithStatus.length > 3 ? (
            <>
              <div className="w-screen max-w-[430px] h-full mb-10">
                <div className="text-lg -mt-4 font-groteskSemiBold text-cultureBeige pl-4 pb-4">
                  Explore Alpha Creators
                </div>
                <Slider {...creatorCarouselSettings} className="w-full h-full">
                  {creatorsWithStatus.map((creator) => (
                    <div
                      key={creator._id}
                      className="flex flex-row"
                      onClick={() =>
                        handleCreatorStoreClick(creator._id as string)
                      }
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div
                          className={`w-[110px] h-[120px] overflow-hidden border-2 rounded-md relative ${
                            creator.isMember
                              ? "border-cultureOrange"
                              : creator.isFollowing && !creator.isMember
                              ? "border-cultureBeige"
                              : "border-cultureWhite"
                          }`}
                        >
                          <img
                            src={creator.profilePicture}
                            alt={creator.name}
                            className="w-full h-full object-cover"
                          />
                          {creator.isMember && (
                            <div className="absolute rounded-md bottom-1 bg-cultureOrange right-1 p-1">
                              <CultureCoLogoIcon
                                size={14}
                                fillColor="#282b28"
                              />
                            </div>
                          )}
                          {creator.isFollowing && !creator.isMember && (
                            <div className="absolute rounded-md bottom-1 border-cultureOrange border-2 bg-cultureGray right-1 p-1">
                              <FollowingIconForExplore
                                size={14}
                                fillColor="#f1f5ed"
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-center justify-center mt-2 text-sm text-cultureWhite font-groteskSemiBold">
                          {creator.name}
                          <div className="text-xs text-cultureWhite font-groteskRegular">
                            {creator.creatorType}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </>
          ) : creatorsWithStatus && creatorsWithStatus.length > 0 ? (
            <div className="w-screen max-w-[430px] h-full mb-10">
              <div className="text-lg -mt-4 font-groteskSemiBold text-cultureBeige pl-4 pb-4">
                Explore Creators
              </div>
              <div className="w-full h-full flex flex-row items-center justify-between px-4">
                {creatorsWithStatus.map((creator) => (
                  <div
                    key={creator._id}
                    className="flex flex-row"
                    onClick={() =>
                      handleCreatorStoreClick(creator._id as string)
                    }
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className={`w-[110px] h-[120px] overflow-hidden border-2 rounded-md relative ${
                          creator.isMember
                            ? "border-cultureOrange"
                            : creator.isFollowing && !creator.isMember
                            ? "border-cultureBeige"
                            : "border-cultureWhite"
                        }`}
                      >
                        <img
                          src={creator.profilePicture}
                          alt={creator.name}
                          className="w-full h-full object-cover"
                        />
                        {creator.isMember && (
                          <div className="absolute rounded-md bottom-1 bg-cultureOrange right-1 p-1">
                            <CultureCoLogoIcon size={14} fillColor="#282b28" />
                          </div>
                        )}
                        {creator.isFollowing && !creator.isMember && (
                          <div className="absolute rounded-md bottom-1 border-cultureOrange border-2 bg-cultureGray right-1 p-1">
                            <FollowingIconForExplore
                              size={14}
                              fillColor="#f1f5ed"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center mt-2 text-sm text-cultureWhite font-groteskSemiBold">
                        {creator.name}
                        <div className="text-xs text-cultureWhite font-groteskRegular">
                          {creator.creatorType}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-screen max-w-[430px] h-full mb-4">
              <div className="text-lg -mt-4 font-groteskSemiBold text-cultureBeige pl-4 pb-4">
                Explore Creators
              </div>
              <div className="text-xs -mt-4 font-groteskSemiBold text-cultureOrange pl-4 pb-4">
                You&apos;re following all the creators!
              </div>
              <div className="text-xs -mt-4 font-groteskSemiBold text-cultureOrange pl-4 pb-4">
                Thank you for your invaluable support!
              </div>
            </div>
          )}

          {trendingProducts && trendingProducts.length > 1 ? (
            <div className="w-screen max-w-[430px] h-full mb-32">
              <div className="text-lg -mt-4 font-groteskSemiBold text-cultureBeige pl-4">
                Discover
              </div>
              <Slider
                {...productCarouselSettings}
                className="mt-4 w-full h-full"
              >
                {trendingProducts.map((product: IProductData) => (
                  <div
                    className="flex flex-row items-center justify-center h-[480px] w-full"
                    key={product._id}
                  >
                    <div
                      className="flex items-center justify-center h-[480px] w-full"
                      onClick={() => handleDetailedView(product)}
                    >
                      <ProductCard product={product} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : trendingProducts && trendingProducts.length === 1 ? (
            <div className="w-screen max-w-[430px] h-full">
              <div className="text-lg -mt-4 font-groteskSemiBold text-cultureBeige pl-4">
                Discover
              </div>
              <div
                className="flex flex-row mt-4 items-center justify-center h-[480px] w-full"
                onClick={() => handleDetailedView(trendingProducts[0])}
              >
                <ProductCard product={trendingProducts[0]} />
              </div>
            </div>
          ) : (
            <div className="w-screen max-w-[430px] h-full">
              <div className="text-lg -mt-4 font-groteskSemiBold text-cultureBeige pl-4">
                Discover
              </div>
              <div className="text-lg mt-2 font-groteskSemiBold text-cultureOrange pl-4">
                You have purchased all available products!
              </div>
              <div className="text-xs font-groteskSemiBold text-cultureOrange pl-4 pb-4">
                Thank you for your invaluable support!
              </div>
            </div>
          )}

          {detailedView && (
            <DetailedView product={productDataForDetailedView!} />
          )}
          <BottomNav className="fixed bottom-0 w-full max-w-mobile" />
        </div>
      ) : (
        <>
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
                    Welcome to CultureCo - where independent artists thrive, &
                    fans dive deeper into the culture they love.
                  </h1>
                  <p className="text-cultureOrange mt-4 mx-auto font-groteskRegular text-base">
                    One platform. Endless possibilities.
                  </p>
                  <div className="flex flex-col w-full items-center gap-2 mt-auto">
                    <Button
                      onClick={() => {
                        location.href = `/auth/signin`;
                      }}
                      className="bg-cultureOrange w-full h-[50px] hover:text-cultureOrange hover:bg-cultureGrayVariant font-groteskSemiBold text-cultureWhite"
                    >
                      ENTER
                    </Button>

                    <Button
                      onClick={handleCreatorClick}
                      variant={"outline"}
                      className="text-cultureOrange h-[50px] w-full bg-[#2E2F32] hover:text-cultureBeige hover:border-cultureBeige font-groteskSemiBold"
                    >
                      Apply to Become a Creator
                    </Button>
                  </div>
                </div>
                <span className="relative font-groteskRegular mt-2 -top-5 flex w-full items-center justify-center">
                  <p className="text-sm text-cultureWhite">Scroll </p>
                  <motion.span
                    animate={{ y: [5, 0, 5, 0, 5] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <ChevronDown className="text-cultureWhite" />
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
                    location.href = `/auth/signin`;
                  }}
                  className="bg-cultureOrange font-groteskSemiBold text-cultureWhite w-full h-[50px] hover:text-cultureOrange hover:bg-cultureGrayVariant"
                >
                  ENTER
                </Button>

                <Button
                  variant={"outline"}
                  className="text-cultureOrange font-groteskSemiBold h-[50px] w-full bg-[#2E2F32] hover:text-cultureBeige hover:border-cultureBeige"
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
                          <h1 className="text-cultureWhite text-xs">
                            {ele.name}
                          </h1>
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
                      location.href =
                        "https://www.instagram.com/cultureco.xyz/";
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
        </>
      )}
    </div>
  );
}

export default Landing;
