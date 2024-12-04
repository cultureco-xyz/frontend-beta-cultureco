import React, { useState } from "react";
import { Button } from "../ui/button";

function CopperXButton({
  creator,
  productId,
  cost,
}: {
  creator: string;
  productId: string;
  cost: number;
}) {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/backend/payment/copperx/order-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cost, creator, productId }), // You can pass dynamic quantity here
    });

    if (res) {
      const resJson = await res.json();
      location.href = resJson.url;
    }

    setLoading(false);
  };

  return (
    <Button
      variant={"outline"}
      className="bg-cultureGray border-2 border-cultureOrange text-lg h-[45px] font-groteskSemiBold w-full text-cultureOrange rounded px-4 py-2"
      disabled={loading}
      onClick={() => {
        location.href = "/base-payment/" + productId;
      }}
    >
      {loading ? "Loading..." : "Pay with Crypto"}
    </Button>
  );
}

export default CopperXButton;
