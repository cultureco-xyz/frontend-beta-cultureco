"use client";
import { useState } from "react";
import { Button } from "../ui/button";

export const RazorpayPurchaseButton = ({
  creator,
  cost,
  title,
}: {
  creator: string;
  cost: number;
  title?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    setIsLoading(true);
    console.log(cost);
    try {
      // Create an order by calling the API
      const orderRes = await fetch("/backend/payment/razorpay/order-tribe", {
        method: "POST",
        body: JSON.stringify({ amount: cost, creator }),
        headers: { "Content-Type": "application/json" },
      });

      const orderData = await orderRes.json();
      const { amount, id: order_id, currency } = orderData;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY as string, // Razorpay Key
        amount: amount.toString(),
        currency: currency,
        name: "CultureCo",
        description: "Tipping Transaction",
        order_id: order_id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          // Post payment details to your backend to verify signature and confirm payment
          await fetch("/backend/payment/razorpay/verify-tribe", {
            method: "POST",
            body: JSON.stringify({
              order_id: razorpay_order_id,
              payment_id: razorpay_payment_id,
              signature: razorpay_signature,
              creator,
              cost,
            }),
            headers: { "Content-Type": "application/json" },
          });
          window.location.reload();
        },
        prefill: {
          name: "Customer Name",
          email: "customer.email@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      //@ts-expect-error // Razorpay is injected not part of native window
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error during payment process:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="bg-cultureGray border-2 border-cultureOrange text-lg h-[45px] font-groteskSemiBold w-full text-cultureOrange rounded px-4 py-2"
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : title ? title : "Pay with UPI"}
    </Button>
  );
};
