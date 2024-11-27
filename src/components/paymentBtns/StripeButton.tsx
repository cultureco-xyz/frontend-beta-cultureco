"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function StripePurchase({
  creator,
  productId,
  cost,
}: {
  creator: string;
  productId: string;
  cost: number;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/backend/payment/stripe/order-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cost, creator, productId }), // You can pass dynamic quantity here
    });

    const { id } = await res.json();
    const stripe = await stripePromise;

    // Redirect to Stripe Checkout
    const result = await stripe!.redirectToCheckout({ sessionId: id });

    if (result.error) {
      alert(result.error.message);
    }

    setLoading(false);
  };

  return (
    <Button
      className="bg-cultureGray border-2 border-cultureOrange text-lg h-[45px] font-groteskSemiBold w-full text-cultureOrange rounded px-4 py-2"
      disabled={loading}
      onClick={handleCheckout}
    >
      {loading ? "Loading..." : "Pay with Stripe"}
    </Button>
  );
}
