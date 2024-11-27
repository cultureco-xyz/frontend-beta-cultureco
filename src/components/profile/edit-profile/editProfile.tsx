import React, { useEffect, useState } from "react";
import axios from "axios";
import { create } from "zustand";
import { User2 } from "lucide-react";
import UploadCircle from "@/assets/svgs/upload-circle";
import { handleProfilePicUpload } from "@/lib/utils";
import Spinner from "@/components/common/spinner";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types";
import { useAuthenticated } from "@/hooks/useAuthenticated";
import { useQueryClient } from "@tanstack/react-query";

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

type EditProfileProps = {
  profile: UserData;
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

function EditProfile({ profile }: EditProfileProps) {
  const queryClient = useQueryClient();
  const { name, username, bio, profilePicture, setValue } = useStore();
  const [profilePicUploadProgress, setProfilePicUploadProgress] =
    useState<number>();

  // Populate form fields with existing profile data
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("username", profile.username);
      setValue("bio", profile.bio);
      setValue("profilePicture", profile.profilePicture);
    }
  }, [profile, setValue]);

  // Edit profile functionality
  const saveDetails = async () => {
    try {
      const res = await axios.post(
        "/backend/user/update-profile",
        {
          username,
          name,
          bio,
          profilePicture,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        location.href = "/account";
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 py-6 pb-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveDetails();
        }}
        className="flex h-full flex-col w-full text-white px-2 mt-5"
      >
        <h1 className="text-lg">Edit your profile</h1>
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

export default EditProfile;
