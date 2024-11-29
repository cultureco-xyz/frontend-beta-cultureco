"use client";
import React, { useEffect } from "react";
import CultureLoader from "@/components/common/cultureLoader";
import axios from "axios";

function Success() {
  useEffect(() => {
    //update transaction
    // Get the current URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extract the session_id
    const sessionId = urlParams.get("session_id");

    console.log(sessionId);
    axios
      .post("/backend/payment/stripe/verify-tribe", {
        order_id: sessionId,
      })
      .then(() => {
        console.log("Payment complete");
        location.href = "/";
      });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-24 text-white font-groteskMedium">
        Processing request..
      </h1>
      <div className="text-white mt-8">
        <CultureLoader />
      </div>
    </div>
  );
}

export default Success;
