import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { create } from "zustand";
import { ChevronLeft, User2 } from "lucide-react";
import UploadCircle from "@/assets/svgs/upload-circle";
import { handleProfilePicUpload } from "@/lib/utils";
import Spinner from "../common/spinner";

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

function BasicDetails() {
  const { name, username, bio, profilePicture, setValue } = useStore();
  const [profilePicUploadProgress, setProfilePicUploadProgress] =
    useState<number>();
  console.log({ name, username, bio, profilePicture });

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
        location.href = "/account";
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 py-6 pb-8">
      <span className="flex w-full text-white">
        <span
          className="flex items-center h-fit text-base"
          onClick={() => {
            location.href = "/";
          }}
        >
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
              handleProfilePicUpload(e, {
                setValue: (v) => {
                  setValue("profilePicture", v);
                },
                setProgress: (p) => {
                  setProfilePicUploadProgress(p);
                },
              });
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

export default BasicDetails;
