/* eslint-disable @next/next/no-img-element */
/*App.js*/
"use client";
import React, { ReactNode, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { motion } from "framer-motion";
import { ChevronLeft, User2 } from "lucide-react";
import UploadCircle from "@/assets/svgs/upload-circle";
import { Button } from "@/components/ui/button";

import { create } from "zustand";
import Spinner from "@/components/common/spinner";

type Store = {
  name: string;
  username: string;
  bio: string;
  profilePicture: string;
  setValue: (
    label: "name" | "username" | "bio" | "profilePicture",
    value: string
  ) => void;
};

const useStore = create<Store>()((set) => ({
  name: "",
  username: "",
  bio: "",
  profilePicture: "",
  setValue: (
    label: "name" | "username" | "bio" | "profilePicture",
    value: string
  ) => {
    set({ [`${label}`]: value });
  },
}));

function Signin() {
  const [screen, setscreen] = useState<"SIGNIN" | "USER_FORM" | "CREATOR_FORM">(
    "SIGNIN"
  );

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
      location.href = "/account";
    }

    return res;
  };

  return (
    <div className="bg-black flex w-full h-svh justify-center items-center">
      <div className="flex  flex-col justify-center items-center w-[361px] min-h-[603px] bg-grad-bg rounded-2xl">
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
      </div>
    </div>
  );
}

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

function BasicDetails() {
  const { name, username, bio, profilePicture, setValue } = useStore();
  const [profilePicUploadProgress, setProfilePicUploadProgress] =
    useState<number>();
  console.log({ name, username, bio, profilePicture });

  const handleProfilePicUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      const response = await axios.post("/backend/get-signed-url", {
        fieldName: "profilePic",
        fileName: selectedFile.name,
        fileType: selectedFile.type,
      });
      const { signedUrl, key } = response.data;

      const uploadResponse = await axios.put(signedUrl, selectedFile, {
        headers: { "Content-Type": selectedFile.type },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProfilePicUploadProgress(progress);
          }
        },
      });

      if (uploadResponse.status === 200) {
        const imageUrl = `https://dkrwjr7mnvu4o.cloudfront.net/${key}`;
        setValue("profilePicture", imageUrl);
        // onProfilePicUpload(imageUrl);
        setProfilePicUploadProgress(undefined);
      }
    }
  };

  const saveDetails = async () => {
    const SIGNUPTOKEN = localStorage.getItem("SIGNUPTOKEN") as string;
    if (SIGNUPTOKEN) {
      localStorage.removeItem("SIGNUPTOKEN");
      const res = await axios.post("/backend/user/create-user", {
        SIGNUPTOKEN,
        username,
        name,
        bio,
        profilePicture,
      });
      if (res.status == 200) {
        alert("Success");
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 py-6 pb-8">
      <span className="flex w-full text-white">
        <span className="flex items-center h-fit text-base">
          <ChevronLeft className="h-4 w-4" /> Back
        </span>
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveDetails();
        }}
        className="flex h-full flex-col w-full text-white px-2 mt-5"
      >
        <h1 className="text-lg">Set up your profile</h1>
        <label
          htmlFor="fileupload"
          className="flex cursor-pointer w-[128px] h-[128px] mx-auto mt-6 relative"
        >
          <UploadCircle />
          <input
            id="fileupload"
            type="file"
            className="absolute w-full h-full left-0 top-0 opacity-0"
            onChange={(e) => {
              handleProfilePicUpload(e);
            }}
          />
          {profilePicUploadProgress && (
            <div className="absolute left-0 right-0 top-0 bottom-0 flex w-[90%] h-[90%] justify-center items-center rounded-full p-4 bg-[#CCCCCC33] backdrop-blur-lg m-auto mt-[9px]">
              <Spinner className="" />
            </div>
          )}
          {profilePicture && (
            <img
              className="flex w-[128px] h-[128px] p-2 rounded-full absolute left-0 right-0 bottom-0 top-0 object-cover m-auto mt-[2px]"
              src={profilePicture}
              alt=""
            />
          )}
        </label>
        {/* username */}
        <label className="mt-4" htmlFor="">
          <p>Username*:</p>
          <span className="mt-1 flex items-center px-2 w-full h-[41px] bg-cultureGray border-white border-[1px] rounded-lg">
            <User2 className="h-4" />
            <input
              required
              type="text"
              value={username}
              onChange={(e) => {
                setValue("username", e.target.value);
              }}
              className="bg-transparent w-full h-full hover:outline-none active:outline-none"
            />
          </span>
        </label>
        {/* name */}
        <label className="mt-4" htmlFor="">
          <p>Name*:</p>
          <span className="mt-1 flex items-center px-2 w-full h-[41px] bg-cultureGray border-white border-[1px] rounded-lg">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => {
                setValue("name", e.target.value);
              }}
              className="bg-transparent w-full h-full hover:outline-none active:outline-none"
            />
          </span>
        </label>

        {/* Bio */}
        <label className="mt-4" htmlFor="">
          <p>Bio(optional):</p>
          <span className="mt-1 py-1 flex items-center px-2 w-full h-auto bg-cultureGray border-white border-[1px] rounded-lg">
            {/* <User2 className="h-4" /> */}
            <textarea
              value={bio}
              onChange={(e) => {
                setValue("bio", e.target.value);
              }}
              rows={3}
              className="bg-transparent w-full hover:outline-none active:outline-none"
            />
          </span>
        </label>
        {/* Save */}
        <Button
          type="submit"
          className="mt-6 h-[52px] text-cultureOrange bg-cultureGray font-groteskBold"
          variant={"outline"}
        >
          Save And Proceed
        </Button>
      </form>
    </div>
  );
}

export default Signin;
