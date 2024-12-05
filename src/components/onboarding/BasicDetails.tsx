import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { create } from "zustand";
import { ChevronLeft, User2 } from "lucide-react";
import UploadCircle from "@/assets/svgs/upload-circle";
import { handleProfilePicUpload } from "@/lib/utils";
import Spinner from "../common/spinner";
import { useDebounce } from "@/hooks/useDebounce";

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
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailabilityMessage, setUsernameAvailabilityMessage] =
    useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Debounced username for efficient checking
  const debouncedUsername = useDebounce(username, 500); // 500ms debounce delay

  const saveDetails = async () => {
    const SIGNUPTOKEN = localStorage.getItem("SIGNUPTOKEN") as string;
    if (SIGNUPTOKEN) {
      localStorage.removeItem("SIGNUPTOKEN");
      if (isUsernameTaken || usernameError) {
        return; // Don't allow saving if there are errors
      }

      setIsSaving(true);

      const lowerUsername = username.toLowerCase();
      const res = await axios.post("/backend/user/create-user", {
        SIGNUPTOKEN,
        username: lowerUsername,
        name,
        bio,
        profilePicture,
      });
      if (res.status == 200) {
        location.href = "/account/user";
      }
    }
  };

  // Check if the username is available (debounced check)
  useEffect(() => {
    const checkUsername = async () => {
      try {
        const response = await axios.post(
          "/backend/user/check-username",
          { username: debouncedUsername },
          { withCredentials: true }
        );
        setIsUsernameTaken(response.data.isTaken);
        setUsernameError(""); // Clear previous error if the username is available
        if (response.data.isTaken) {
          setUsernameAvailabilityMessage("Username is already taken");
        } else {
          setUsernameAvailabilityMessage("Username is available");
        }
      } catch (error) {
        // Handle the error response
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 409) {
            setIsUsernameTaken(true); // Username is taken
            setUsernameAvailabilityMessage("Username is already taken");
          } else {
            console.error("Unexpected error: ", error.response);
          }
        } else {
          console.error("Error checking username:", error);
        }
      }
    };

    // Only check if the username is long enough
    if (debouncedUsername.length >= 5) {
      checkUsername();
    } else {
      setIsUsernameTaken(false); // Reset if username is too short
      setUsernameError("Username must be at least 5 characters.");
      setUsernameAvailabilityMessage(""); // Clear availability message
    }

    if (debouncedUsername.length < 5) {
      setUsernameError("Username must be at least 5 characters.");
    }
  }, [debouncedUsername]);

  // Handle disallowed characters in username
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;

    // Disallow special characters and check max length
    const disallowedChars = /[^a-zA-Z0-9_.]/;
    if (newUsername.length <= 20 && !disallowedChars.test(newUsername)) {
      setValue("username", newUsername);
      setUsernameError(""); // Clear error when username is valid
    } else {
      if (newUsername.length > 20) {
        setUsernameError("Username cannot be longer than 20 characters.");
      } else {
        setUsernameError(
          "Username can only contain letters, numbers, periods and underscores."
        );
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
              autoCapitalize="off"
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="bg-transparent w-full h-full hover:outline-none active:outline-none"
            />
          </span>
          {usernameError && (
            <p className="text-red-500 text-sm mt-2">{usernameError}</p>
          )}
          {usernameAvailabilityMessage && !usernameError && (
            <p
              className={`text-sm mt-2 ${
                isUsernameTaken ? "text-red-500" : "text-green-500"
              }`}
            >
              {usernameAvailabilityMessage}
            </p>
          )}
        </label>
        {/* name */}
        <label className="mt-4" htmlFor="">
          <p>Name*:</p>
          <span className="mt-1 flex items-center px-2 w-full h-[41px] bg-cultureGray border-white border-[1px] rounded-lg">
            <input
              required
              placeholder="Name"
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
              placeholder="Tell us about yourself!"
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
          disabled={isUsernameTaken || Boolean(usernameError) || isSaving}
        >
          {isSaving ? "Saving..." : "Save And Proceed"}
        </Button>
      </form>
    </div>
  );
}

export default BasicDetails;
