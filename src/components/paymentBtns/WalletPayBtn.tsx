"use client";

import { useState } from "react";
import { base } from "viem/chains";
import ABI from "./ABI.json";
import { Button } from "../ui/button";
import axios from "axios";
import { ethers } from "ethers";

export const WalletPayButton = ({
  cost,
  creator,
  productId,
  onSuccess,
  onFailed,
}: {
  cost: number;
  creator: string;
  productId: string;
  onSuccess: (trx: string) => void;
  onFailed: () => void;
}) => {
  const [started, setStarted] = useState(false);
  const [errors, setErrors] = useState("");
  const [completed, setCompleted] = useState(false);

  const handlePayment = async (
    cost: number,
    creator: string,
    productId: string
  ) => {
    try {
      //get creator wallet
      const walletQuery = await axios.get(`/backend/user/wallet/${creator}`);

      if (walletQuery.status !== 200) {
        throw new Error("Creator wallet not found");
      }

      // Ensure MetaMask (or other wallet) is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
      }

      setErrors("");
      setStarted(true);

      // Initialize provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum); // v6 syntax
      const signer = await provider.getSigner();

      // Ensure the user is connected to the correct network
      const network = await provider.getNetwork();
      if (`${network.chainId}` !== `${base.id}`) {
        throw new Error(
          `Please switch to the correct network (chainId: ${base.id}).`
        );
      }

      // Set up the contract instance
      const contractAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const creatorWallet = walletQuery.data.wallet;
      // Execute the transaction
      const tx = await contract.transfer(`${creatorWallet}`, cost * 1000000);

      // Wait for transaction confirmation
      const receipt = await tx.wait();

      // Notify backend of payment
      const res = await fetch("/backend/payment/base/order-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cost,
          creator,
          productId,
          trx: receipt.hash,
        }),
      });

      if (res.ok) {
        const { id } = await res.json();
        await axios.post("/backend/payment/base/verify-product", {
          order_id: id,
        });
        console.log("Payment complete");
        location.href = "/";
      }

      onSuccess(receipt);
      console.log(receipt);
      setCompleted(true);
    } catch (err) {
      console.error(err);
      setStarted(false);
      onFailed();
      setErrors(`${err}` || "Payment failed. Please try again.");
    }
  };

  return (
    <>
      {!completed && (
        <Button
          disabled={started}
          className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cultureOrange hover:bg-cultureBeige focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            handlePayment(cost, creator, productId);
          }}
        >
          {started ? "Confirming..." : "Pay Now"}
        </Button>
      )}
      {completed && (
        <p className="text-stone-800 mt-2 bg-green-200 rounded-md text-sm py-2 px-4">
          Thank you for your payment.
        </p>
      )}
      {errors && (
        <p className="text-stone-800 mt-2 bg-red-200 rounded-md text-sm py-2 px-4">
          {errors}
        </p>
      )}
    </>
  );
};
