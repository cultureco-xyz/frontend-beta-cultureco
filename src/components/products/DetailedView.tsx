/* eslint-disable @next/next/no-img-element */
import Album from "@/assets/svgs/album";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { IComment, IProductData, UserData } from "@/types";

import React, { useState } from "react";
import { LuArrowRightCircle } from "react-icons/lu";

import { ChevronLeft, MessageSquare, Share, VerifiedIcon } from "lucide-react";
import { PiFire, PiFireBold } from "react-icons/pi";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { create } from "zustand";
import { useAuthenticated } from "@/hooks/useAuthenticated";
import { Button } from "../ui/button";

import { RazorpayPurchaseButton } from "../paymentBtns/RazorPayButton";
import StripePurchase from "../paymentBtns/StripeButton";
import CopperXButton from "../paymentBtns/CopperXButton";
// import TicketCheckoutFlow from "./TicketCheckout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "react-h5-audio-player";

interface DetailedStore {
  likeCount: number;
  isLiked: boolean;
  newComment: string;
  comments: IComment[];
}

interface DetailedState extends DetailedStore {
  setStore: (data: Partial<DetailedStore>) => void;
  toggleLike: (action: "LIKE" | "UNLIKE") => void;
}

const useStore = create<DetailedState>()((set) => ({
  likeCount: 0,
  isLiked: false,
  newComment: "",
  comments: [],
  setStore: (data: Partial<DetailedStore>) => set(data),
  toggleLike: (action: "LIKE" | "UNLIKE") => {
    if (action == "LIKE") {
      set((st) => ({
        likeCount: st.likeCount + 1,
      }));
    }
    if (action == "UNLIKE") {
      set((st) => ({
        likeCount: st.likeCount > 0 ? st.likeCount - 1 : 0,
      }));
    }
  },
}));

function DetailedView({ product }: { product: IProductData }) {
  const { setStore, newComment, likeCount, toggleLike, isLiked, comments } =
    useStore();
  const { isLogedIn, user: authData } = useAuthenticated();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicPlayerOpen, setMusicPlayerOpen] = useState(false);
  console.log(isLogedIn, authData);

  //fetch product
  const productDetails = useQuery({
    queryKey: ["product-details", product._id, isLogedIn],
    queryFn: async () => {
      //product detailes
      const detailsReq = axios.get(
        `/backend/product/get-product/${product._id}`
      );
      //liked status
      const isLikedReq = isLogedIn
        ? axios.post("/backend/like/is-liked", {
            productId: product._id,
          })
        : Promise.resolve({ data: { isLiked: false } });
      //get comments

      const commentsReq = axios.get(`/backend/comment/product/${product._id}`);

      const [details, isLiked, comments] = await Promise.all([
        detailsReq,
        isLogedIn ? isLikedReq : Promise.resolve({ data: { isLiked: false } }),
        commentsReq,
      ]);

      setStore({
        comments: comments.data.comments.reverse(),
      });

      // set intial state
      setStore({
        likeCount: details.data.likeCount,
        isLiked: isLiked.data.isLiked,
      });
      return {
        productData: details.data.productData,
        likeCount: details.data.likeCount,
        isLiked: isLiked.data.isLiked,
      } as { productData: IProductData; likeCount: number; isLiked: boolean };
    },
  });

  const likeMutation = useMutation({
    mutationKey: ["like-mutation", product._id],
    mutationFn: async (action: "LIKE" | "UNLIKE") => {
      try {
        if (action == "LIKE") {
          //like the product
          const res = await axios.post(
            `/backend/like/product/${product._id}/like`
          );
          if (res.status == 201) {
            toggleLike("LIKE");
            productDetails.refetch();
            return true;
          }
        } else if (action == "UNLIKE") {
          //unlike the product
          const res = await axios.delete(
            `/backend/like/product/${product._id}/unlike`
          );
          if (res.status == 200) {
            toggleLike("UNLIKE");
            productDetails.refetch();
            return true;
          }
        }
      } catch (er) {
        console.log(er);
        throw er;
      }
    },
  });

  const commentMutation = useMutation({
    mutationKey: ["comment-mutation", product._id],
    mutationFn: async () => {
      const res = await axios.post("/backend/comment/post-comment", {
        productId: product._id,
        content: newComment,
      });
      if (res.status == 201) {
        //reset field
        setStore({ newComment: "" });
        // add comment to local state
        const user = authData;
        setStore({
          comments: [
            {
              content: newComment,
              productId: product._id,
              userId: user as UserData,
            },
            ...comments,
          ],
        });
        productDetails.refetch();
        return res.data;
      }
    },
  });

  const isPurchasedQuery = useQuery({
    queryKey: ["is-purchased", product._id],
    queryFn: async () => {
      const res = await axios.get(
        `/backend/product-purchase/user/${authData?._id}/${product._id}`
      );
      return res.data.isPurchased;
    },
    enabled: isLogedIn,
  });

  const isPurchased = Boolean(
    isPurchasedQuery.isSuccess && isPurchasedQuery.data
  );

  const handleMusicPlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMusicPlayerOpen(true);
    setMusicPlaying(!musicPlaying);
  };

  const handleMusicPlayerClose = () => {
    setMusicPlaying(false);
    setMusicPlayerOpen(false);
  };

  return (
    <div className="flex  flex-col w-full h-svh bg-black  mx-auto top-0 left-0 right-0 max-w-mobile fixed overflow-y-auto z-[80]">
      <img
        className="absolute w-full max-w-mobile mx-auto top-0 left-0 min-h-[80svh] object-cover"
        src={product.imageURL}
        alt=""
      />
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)`,
        }}
        className="flex flex-col z-10 pt-[50vh] h-full relative w-full px-4 "
      >
        <div className="absolute right-4 top-[45%] transform -translate-y-1/2 flex flex-col items-end gap-4 pb-12">
          <span className="flex gap-1 items-center cursor-pointer text-white">
            {likeCount > 0 && <p className="text-xs text-white">{likeCount}</p>}
            <PiFireBold
              onClick={() => {
                if (!isLogedIn) {
                  location.href = "/auth/signin";
                }
                if (isLiked) {
                  likeMutation.mutate("UNLIKE");
                } else {
                  likeMutation.mutate("LIKE");
                }
              }}
              style={{
                color: isLiked ? "#FE621D" : "white",
              }}
              className="text-[26px]"
            />
          </span>
          <span className="flex gap-1 items-center text-white">
            <p className="text-xs">{comments.length}</p>
            <MessageSquare />
          </span>
          <span className="flex flex-row justify-end w-full text-white">
            <Share />
          </span>
        </div>
        {/* Music play/pause button */}
        {product.audioUrl && !musicPlayerOpen && (
          <Button
            variant="default"
            className="bg-cultureGray text-digitalMusicGreen w-fit"
            onClick={handleMusicPlay}
          >
            {musicPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </Button>
        )}
        {product.audioUrl && !musicPlayerOpen && (
          <div className="flex justify-between">
            <span className="flex flex-col">
              <h1 className="text-white text-2xl capitalize font-groteskBold">
                {product.title}
              </h1>
              <p className="text-white text-md leading-3 capitalize">
                {productDetails.isSuccess &&
                  productDetails.data.productData.creator.name}
              </p>
              <Album className="mt-3" />
            </span>
            <span className="text-white items-end flex flex-col mt-4">
              <p className="flex items-center gap-1">
                <CultureCoLogoIcon fillColor={"white"} />
                <h1 className="text-2xl font-groteskBold">
                  ₹{product.memberPrice}
                </h1>
              </p>
              <p className="text-md font-groteskMedium">
                ₹{product.regularPrice}
              </p>
              <p className="text-xs">for non members</p>
            </span>
          </div>
        )}
        {musicPlayerOpen && (
          <div
            className="w-full px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col my-0 bg-digitalMusicGreen rounded-md">
              <div className="flex flex-row justify-between w-full px-4 h-8 rounded-t-md">
                <div className="font-groteskSemiBold text-cultureGray flex items-center justify-center">
                  {product.songName}
                </div>
                <button
                  className="text-cultureGray flex items-center justify-center"
                  onClick={handleMusicPlayerClose}
                >
                  <FontAwesomeIcon icon={faTimes} className="text-black" />
                </button>
              </div>
              <AudioPlayer
                src={product.audioUrl}
                autoPlay
                onPlay={() => setMusicPlaying(true)}
                onPause={() => setMusicPlaying(false)}
                className="audio-player"
              />
            </div>
          </div>
        )}
        <p className="text-white text-xs mt-3">{product.description}</p>
        <span className="flex w-full items-center text-white mt-3">
          <span className="flex items-center gap-2">
            <h1 className="font-fredokaSemiBold text-2xl">23</h1>
            <p className="text-xs text-cultureOrange">H</p>
            <h1 className="font-fredokaSemiBold text-2xl">56</h1>
            <p className="text-xs text-cultureOrange">M</p>
            <h1 className="font-fredokaSemiBold text-2xl">32</h1>
            <p className="text-xs text-cultureOrange">S</p>
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <h1 className="text-xl font-groteskBold text-cultureOrange">56</h1>
            <p className="text-cultureOrange mb-[0.6px]">collected</p>
          </span>
        </span>
        <div className="flex flex-col mt-2">
          <div className="flex flex-col pr-2 items-center w-full h-fit rounded-md border-[0.5px] border-stone-600 bg-cultureGray font-groteskRegular">
            <textarea
              value={newComment}
              onChange={(e) => {
                setStore({
                  newComment: e.target.value,
                });
              }}
              style={{
                height: `40px`,
              }}
              rows={1}
              placeholder="Only members and collectors can leave comments"
              className="placeholder:text-stone-500 text-white p-2 placeholder:text-[11px] max-h-[100px] text-xs outline-none w-full border-none active:outline-none bg-transparent min-h-[42px]"
            />
            <LuArrowRightCircle
              onClick={() => {
                //post comment
                if (!isLogedIn) {
                  location.href = "/auth/signin";
                }
                commentMutation.mutate();
              }}
              className="text-2xl text-cultureOrange ml-auto my-2"
            />
          </div>
          <div className="flex flex-col w-full gap-4 my-2 pb-48">
            {comments &&
              comments.map((cmnt) => {
                return (
                  <PrevComment
                    key={cmnt._id}
                    content={cmnt.content}
                    user={cmnt.userId as UserData}
                    commentId={cmnt._id as string}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {productDetails.isSuccess && (
        <CheckoutFlow
          isPurchased={Boolean(isPurchased)}
          product={productDetails.data.productData}
        />
      )}
      {/* <TicketCheckoutFlow
        actualPrice={`${product.regularPrice}`}
        memberPrice={product.memberPrice}
        isMember={true}
        openPurchase={() => {}}
        productID={product._id}
        setCost={() => {}}
        setShowCheckout={() => {}}
        showCheckout={true}
      /> */}
    </div>
  );
}

const CheckoutFlow = ({
  isPurchased,
  product,
}: {
  isPurchased: boolean;
  product: IProductData;
}) => {
  const [steps, setsteps] = useState<"BUY" | "PRICE" | "METHODS">("BUY");
  console.log("ch", isPurchased);
  return (
    <div
      key={"isPurchased" + isPurchased}
      className="fixed justify-center gap-4 items-center min-h-[84px] h-max  max-w-mobile mx-auto bg-cultureGray left-0 right-0 bottom-[56px] z-50  flex w-full rounded-t-lg"
    >
      {steps == "BUY" && (
        <div className="flex gap-4">
          {!isPurchased && (
            <Button
              onClick={() => {
                setsteps("PRICE");
              }}
              variant={"outline"}
              className="text-cultureOrange font-groteskSemiBold h-[54px] w-[110px]"
            >
              Buy
            </Button>
          )}
          <Button
            variant={"outline"}
            className="text-cultureGray font-groteskSemiBold bg-cultureOrange h-[54px] w-fit"
          >
            <CultureCoLogoIcon fillColor="black" />
            Join the Tribe
          </Button>
        </div>
      )}
      {steps == "PRICE" && (
        <div className="flex w-full h-full flex-col">
          <span
            onClick={() => {
              setsteps("BUY");
            }}
            className="flex h-12 w-full text-white items-center border-b-[1px] border-b-cultureWhite"
          >
            <ChevronLeft className="h-6 w-6 text-cultureWhite" />
            <p className="text-sm">Cancel</p>
          </span>
          <div className="flex text-sm justify-between items-center  my-3 w-auto mx-4 px-2  bg-cultureOrange py-2  rounded-lg  font-groteskBold">
            <p className="text-xs">Tribe members get this for ₹750</p>
            <Button className="bg-cultureGray text-cultureOrange rounded-sm text-xs h-[31px]">
              Join Tribe Now
            </Button>
          </div>
          <div className="flex w-full flex-col px-4 ">
            <span className="flex w-full justify-between items-center">
              <span className="text-white">
                <h1 className="text-base font-groteskBold">{product.title}</h1>
                <p className="text-xs">{product.creator.name}</p>
              </span>
              <h1 className="text-white font-groteskBold">
                ₹ {product.regularPrice}
              </h1>
            </span>
            <span className="flex w-full justify-between items-center mt-16">
              <span className="text-white">
                <h1 className="text-base font-groteskBold">Total Amount</h1>
                <p className="text-xs">Inclusive of all Taxes</p>
              </span>
              <h1 className="text-white font-groteskBold">
                ₹ {product.regularPrice}
              </h1>
            </span>
            <Button
              onClick={() => {
                setsteps("METHODS");
              }}
              variant={"outline"}
              className="text-cultureOrange h-[54px] my-4 cursor-pointer text-[17px]"
            >
              Buy at Regular Price
            </Button>
          </div>
        </div>
      )}
      {steps == "METHODS" && (
        <div className="flex w-full h-full flex-col">
          <span
            onClick={() => {
              setsteps("BUY");
            }}
            className="flex cursor-pointer h-12 w-full text-white items-center border-b-[1px] border-b-cultureWhite"
          >
            <ChevronLeft className="h-6 w-6 text-cultureWhite" />
            <p className="text-sm">Cancel</p>
          </span>
          <div className="flex w-full flex-col px-4 my-4 gap-4">
            <RazorpayPurchaseButton
              creator={`${product.creator._id}`}
              cost={product.regularPrice}
              productId={`${product._id}`}
            />
            <StripePurchase
              creator={`${product.creator._id}`}
              cost={product.regularPrice}
              productId={`${product._id}`}
            />
            <CopperXButton
              creator={`${product.creator._id}`}
              cost={product.regularPrice}
              productId={`${product._id}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const PrevComment = ({
  user,
  content,
  commentId,
}: {
  user: UserData;
  content: string;
  commentId: string;
}) => {
  const commentLikeQuery = useQuery({
    queryKey: ["like-comment-query", commentId],
    queryFn: async () => {
      const count = axios.get(`/backend/comment-like/${commentId}/count`);
      const isLiked = axios.post(`/backend/comment-like/${commentId}/isLiked`);
      const res = await Promise.all([count, isLiked]);
      return { count: res[0].data.likeCount, isLiked: res[1].data.isLiked };
    },
  });

  const mutateCommentLikeQuery = useMutation({
    mutationKey: ["like-comment-mutation", commentId],
    mutationFn: async () => {
      const res = await axios.post(`/backend/comment-like/toggle`, {
        commentId: commentId,
      });
      commentLikeQuery.refetch();
      return res.data;
    },
  });

  return (
    <div className="flex items-center px-3">
      <img
        src={user.profilePicture}
        className="h-8 w-8 min-h-8 min-w-8 rounded-full object-cover mb-auto mt-2 mr-2"
        alt=""
      />
      <div>
        <div className="flex items-center space-x-1">
          <h1 className="text-cultureOrange text-xs font-groteskMedium">
            {user.username}
          </h1>
          {true && <VerifiedIcon />}
        </div>
        <p className="text-cultureBeige text-xs">{content}</p>
      </div>

      <span className="ml-auto flex flex-col items-center">
        <PiFire
          onClick={() => {
            if (
              commentLikeQuery.isSuccess &&
              !mutateCommentLikeQuery.isPending
            ) {
              mutateCommentLikeQuery.mutate();
            }
          }}
          style={{
            color: (
              commentLikeQuery.isSuccess ? commentLikeQuery.data.isLiked : false
            )
              ? "#FE621D"
              : "#CAC5BF",
          }}
          className="text-2xl "
        />
        <p className="text-[8px] mt-1 text-cultureBeige">
          {commentLikeQuery.isSuccess ? commentLikeQuery.data.count : 0}
        </p>
      </span>
    </div>
  );
};

export default DetailedView;
