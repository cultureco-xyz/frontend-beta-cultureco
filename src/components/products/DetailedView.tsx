/* eslint-disable @next/next/no-img-element */
import Album from "@/assets/svgs/album";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { IComment, IProductData, UserData } from "@/types";

import React from "react";
import { LuArrowRightCircle } from "react-icons/lu";

import { MessageSquare, Share, VerifiedIcon } from "lucide-react";
import { PiFire, PiFireBold } from "react-icons/pi";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { create } from "zustand";

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

  console.log(comments);

  //fetch product
  const productDetails = useQuery({
    queryKey: ["product-details", product._id],
    queryFn: async () => {
      //product detailes
      const res = await axios.get(
        `/backend/product/get-product/${product._id}`
      );
      //liked status
      const isLiked = await axios.post("/backend/like/is-liked", {
        productId: product._id,
      });
      //get comments
      const comments = await axios.get(
        `/backend/comment/product/${product._id}`
      );

      setStore({
        comments: comments.data.comments.reverse(),
      });

      // set intial state
      setStore({
        likeCount: res.data.likeCount,
        isLiked: isLiked.data.isLiked,
      });
      return {
        productData: res.data.productData,
        likeCount: res.data.likeCount,
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
        const user = localStorage.getItem("user");
        setStore({
          comments: [
            {
              content: newComment,
              productId: product._id,
              userId: JSON.parse(user!) as UserData,
            },
            ...comments,
          ],
        });
        productDetails.refetch();
        return res.data;
      }
    },
  });

  return (
    <div className="flex flex-col w-full h-svh bg-black  mx-auto top-0 left-0 right-0 max-w-mobile fixed overflow-y-auto z-[80]">
      <img
        className="absolute w-full max-w-mobile mx-auto top-0 left-0 min-h-[80svh] object-cover"
        src={product.imageURL}
        alt=""
      />
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)`,
        }}
        className="flex flex-col z-10 pt-[50vh] h-full relative w-full px-4"
      >
        <div className="absolute right-4 top-[45%] transform -translate-y-1/2 flex flex-col items-end gap-4 pb-12">
          <span className="flex gap-1 items-center cursor-pointer text-white">
            {likeCount > 0 && <p className="text-xs text-white">{likeCount}</p>}
            <PiFireBold
              onClick={() => {
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
            <p className="text-xs">{0}</p>
            <MessageSquare />
          </span>
          <span className="flex flex-row justify-end w-full text-white">
            <Share />
          </span>
        </div>
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
                commentMutation.mutate();
              }}
              className="text-2xl text-cultureOrange ml-auto my-2"
            />
          </div>
          <div className="flex flex-col w-full gap-4 my-2 pb-32">
            {comments &&
              comments.map((cmnt) => {
                return (
                  <PrevComment
                    key={cmnt._id}
                    content={cmnt.content}
                    user={cmnt.userId as UserData}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

const PrevComment = ({
  user,
  content,
}: {
  user: UserData;
  content: string;
}) => {
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
          style={{
            color: true ? "#FE621D" : "#CAC5BF",
          }}
          className="text-2xl"
        />
        <p className="text-[8px] mt-1 text-cultureBeige">{1}</p>
      </span>
    </div>
  );
};

export default DetailedView;
