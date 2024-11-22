/* eslint-disable @next/next/no-img-element */
/*App.js*/
"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { motion } from "framer-motion";

import BasicDetails from "@/components/onboarding/BasicDetails";
import CreatorDetails from "@/components/onboarding/CreatorDetails";
import DemoCreatorDetails from "@/components/onboarding/DemoCreatorDetails";
import ClaimDemoCreator from "@/components/onboarding/ClaimDemoCreator";

const GoogleAuth = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-full flex-col gap-[96px] items-center justify-center">
      <motion.div className="flex mt-4 justify-center items-center font-fredokaSemiBold text-cultureOrange text-3xl">
        <CultureCoLogoIcon fillColor="#ECECEC" size={42} />
        <span className="relative">
          <h1 className="text-cultureWhite">CultureCo</h1>
          <span className="text-black absolute right-[15px] bottom-0 -rotate-[8deg] bg-cultureOrange w-[30px] flex items-center justify-center text-[10px] font-groteskSemiBold rounded-lg">
            Beta
          </span>
        </span>
      </motion.div>
      <h1 className="text-center text-2xl  text-white font-groteskBold">
        Alright! <br></br> Let&apos;s get you set up!
      </h1>
      {children}
    </div>
  );
};

function Signin() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    const urlParams = new URLSearchParams(window.location.search);
    const step = urlParams.get("step");
    if (step == "apply") {
      setscreen("CREATOR_FORM");
    } else if (step == "create-demo") {
      setscreen("DEMO_CREATOR_FORM");
    } else if (step == "claim-profile") {
      setscreen("CLAIM_DEMO_CREATOR");
    } else if (user) {
      location.href = "/account";
    }
  }, []);

  const [screen, setscreen] = useState<
    | "SIGNIN"
    | "USER_FORM"
    | "CREATOR_FORM"
    | "DEMO_CREATOR_FORM"
    | "CLAIM_DEMO_CREATOR"
  >("SIGNIN");

  const SendAccessToken = async (access_token: string) => {
    const res = await axios.post("/backend/auth/signin", { access_token });
    console.log(res.data);

    if (res.status !== 200) {
      alert("Sign in failed");
    }

    if (res.data.newUser === true) {
      localStorage.setItem("SIGNUPTOKEN", res.data.signupToken);
      setscreen("USER_FORM");
    }

    if (res.data.newUser === false) {
      location.href = "/";
    }

    return res;
  };

  return (
    <div className="bg-black flex w-full h-svh justify-center items-center">
      <div className="flex  flex-col justify-center items-center w-[361px] min-h-[603px] h-[650px] bg-grad-bg rounded-2xl overflow-y-auto">
        {screen == "SIGNIN" && (
          <GoogleAuth>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                SendAccessToken(credentialResponse.credential as string);
              }}
              onError={() => {}}
            />
          </GoogleAuth>
        )}
        {screen == "USER_FORM" && <BasicDetails />}
        {screen == "CREATOR_FORM" && <CreatorDetails />}
        {screen == "DEMO_CREATOR_FORM" && <DemoCreatorDetails />}
        {screen == "CLAIM_DEMO_CREATOR" && <ClaimDemoCreator />}
      </div>
    </div>
  );
}

export default Signin;
