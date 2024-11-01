import { ChevronLeft } from "lucide-react";
import UploadCircle from "@/assets/svgs/upload-circle";
import { Button } from "@/components/ui/button";

import { create } from "zustand";
import Spinner from "@/components/common/spinner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserData } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { handleProfilePicUpload } from "@/lib/utils";

enum CREATOR_TYPES {
  ARTIST = "Artist",
  MUSICIAN = "Musician",
}

type labels = "name" | "bio" | "profilePicture" | "creatorType";

type CreatorStore = {
  name: string;
  bio: string;
  profilePicture: string;
  creatorType: string;
  setValue: (label: labels, value: string) => void;
};

const useCreatorStore = create<CreatorStore>()((set) => ({
  name: "",
  bio: "",
  profilePicture: "",
  creatorType: "",
  setValue: (label: labels, value: string) => {
    set({ [`${label}`]: value });
  },
}));

const CreatorDetails = () => {
  const { name, bio, creatorType, profilePicture, setValue } =
    useCreatorStore();
  const [profilePicUploadProgress, setProfilePicUploadProgress] =
    useState<number>();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user) as UserData;
      setValue("name", userData.name);
      setValue("bio", userData.bio);
      setValue("profilePicture", userData.profilePicture);
    }
  }, []);

  const updateDetails = async () => {
    const res = await axios.post(
      "/backend/user/change-to-creator",
      {
        name,
        bio,
        creatorType,
        profilePicture,
      },
      {
        withCredentials: true,
      }
    );
    //save local state
    localStorage.setItem("user", JSON.stringify(res.data));
    location.href = "/account/creator";
  };

  return (
    <div className="flex flex-col w-full h-full p-4 py-6 pb-8">
      <span className="flex w-full text-white">
        <span
          onClick={() => {
            location.href = "/";
          }}
          className="flex items-center h-fit text-base"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </span>
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateDetails();
        }}
        className="flex h-full flex-col w-full text-white px-2 mt-5"
      >
        <h1 className="text-lg">Set up your creator profile</h1>
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
        {/* name */}
        <label className="mt-4" htmlFor="">
          <p>Name*:</p>
          <span className="mt-1 flex items-center px-2 w-full h-[41px] bg-cultureGray border-white border-[1px] rounded-lg">
            <input
              value={name}
              onChange={(e) => {
                setValue("name", e.target.value);
              }}
              required
              type="text"
              className="bg-transparent w-full h-full hover:outline-none active:outline-none"
            />
          </span>
        </label>
        {/* name */}
        <label className="mt-4" htmlFor="">
          <p className="mb-1">Creator type*:</p>
          <Select
            required
            value={creatorType || undefined}
            onValueChange={(v) => {
              setValue("creatorType", v);
            }}
          >
            <SelectTrigger className="w-[180px] bg-cultureGray">
              <SelectValue placeholder="Select Creator Type" />
            </SelectTrigger>
            <SelectContent className="bg-cultureGray text-white">
              {Object.values(CREATOR_TYPES).map((ele, key) => {
                return (
                  <SelectItem key={key + ele} value={ele}>
                    {ele}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
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
};

export default CreatorDetails;
