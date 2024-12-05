/* eslint-disable @next/next/no-img-element */
/*App.js*/
"use client";
import React, { useEffect } from "react";

import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { motion } from "framer-motion";
import { ConnectKitButton } from "connectkit";
import { useAccount, useSwitchChain } from "wagmi";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProductData } from "@/types";
import { WalletPayButton } from "@/components/paymentBtns/WalletPayBtn";

const ConnectWallet = ({
  params,
}: {
  params: { productId: string; userId: string };
}) => {
  const productId = params.productId;
  const userId = params.userId;

  console.log(userId);

  const { address: userAddress, chainId } = useAccount();

  //fetch product
  const productDetails = useQuery({
    queryKey: ["product-details-base", productId],
    queryFn: async () => {
      //product detailes
      const detailsReq = await axios.get(
        `/backend/product/get-product/${productId}`
      );

      return detailsReq.data.productData as IProductData;
    },
    enabled: Boolean(productId),
  });

  //switch network
  const { switchChainAsync } = useSwitchChain();
  useEffect(() => {
    if (chainId !== 8453) {
      switchChainAsync({
        chainId: 8453,
      });
    }
  }, [userAddress, chainId]);

  return (
    <div className="bg-black flex w-full h-svh justify-center items-center">
      <div className="flex  flex-col justify-center items-center w-[361px] min-h-[603px] h-[650px] bg-grad-bg rounded-2xl overflow-y-auto">
        <div className="flex w-full h-full flex-col gap-[96px] items-center justify-center">
          <motion.div className="flex mt-4 justify-center items-center font-fredokaSemiBold text-cultureOrange text-3xl">
            <CultureCoLogoIcon fillColor="#ECECEC" size={42} />
            <span className="relative">
              <h1 className="text-cultureWhite">CultureCo</h1>
              <span className="text-black absolute right-[15px] bottom-0 -rotate-[8deg] bg-digitalMusicGreen w-[30px] flex items-center justify-center text-[10px] font-groteskSemiBold rounded-lg">
                Beta
              </span>
            </span>
          </motion.div>
          <h1 className="text-center text-2xl  text-white font-groteskBold">
            Please <br></br> Connect your Wallet
          </h1>
          <div className="flex flex-col w-full items-center gap-4">
            <ConnectKitButton theme="nouns" />
            {productDetails.isSuccess && userAddress && chainId == 8453 && (
              <>
                <WalletPayButton
                  cost={Number(`${productDetails.data?.regularPrice}`)}
                  creator={productDetails.data.creator._id as string}
                  userID={userId}
                  productId={productDetails.data._id as string}
                  onSuccess={(trx: string) => {
                    console.log(trx);
                  }}
                  onFailed={() => {}}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
