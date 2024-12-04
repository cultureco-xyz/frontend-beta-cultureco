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

import { useEffect, useState } from "react";
import axios from "axios";
import { handleProfilePicUpload } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

enum CREATOR_TYPES {
  ARTIST = "Artist",
  MUSICIAN = "Musician",
}

type labels = "name" | "bio" | "username" | "profilePicture" | "creatorType";

type DemoCreatorStore = {
  name: string;
  bio: string;
  profilePicture: string;
  creatorType: string;
  username: string;
  setValue: (label: labels, value: string) => void;
};

const useDemoCreatorStore = create<DemoCreatorStore>()((set) => ({
  name: "",
  bio: "",
  profilePicture: "",
  creatorType: "",
  username: "",
  setValue: (label: labels, value: string) => {
    set({ [`${label}`]: value });
  },
}));

const DemoCreatorDetails = () => {
  const { name, bio, username, creatorType, profilePicture, setValue } =
    useDemoCreatorStore();
  const [profilePicUploadProgress, setProfilePicUploadProgress] =
    useState<number>();
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailabilityMessage, setUsernameAvailabilityMessage] =
    useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Debounced username for efficient checking
  const debouncedUsername = useDebounce(username, 500); // 500ms debounce delay

  const updateDetails = async () => {
    if (isUsernameTaken || usernameError) {
      return; // Don't allow saving if there are errors
    }

    setIsSaving(true);

    const lowerUsername = username.toLowerCase();
    const res = await axios.post(
      "/backend/user/create-demo-profile",
      {
        name,
        username: lowerUsername,
        bio,
        creatorType,
        profilePicture,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status == 200) {
      alert("Demo creator saved");
      location.href = "/account";
    }
    //save local state
    // localStorage.setItem("user", JSON.stringify(res.data));
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
    <div className="flex flex-col w-full h-max p-4 py-6 pb-0  min-h-full">
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
        className="flex h-fit flex-col w-full text-white px-2 mt-5 mb-12"
      >
        <h1 className="text-lg">Set up Demo creator profile</h1>
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
              placeholder="Name"
              className="bg-transparent w-full h-full hover:outline-none active:outline-none"
            />
          </span>
        </label>
        {/* username */}
        <label className="mt-4" htmlFor="">
          <p>username*:</p>
          <span className="mt-1 flex items-center px-2 w-full h-[41px] bg-cultureGray border-white border-[1px] rounded-lg">
            <input
              value={username}
              autoCapitalize="off"
              placeholder="Username"
              onChange={handleUsernameChange}
              required
              type="text"
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
          className="mt-6 h-[52px] text-cultureOrange bg-cultureGray font-groteskBold "
          variant={"outline"}
          disabled={isUsernameTaken || Boolean(usernameError) || isSaving}
        >
          {isSaving ? "Saving..." : "Save And Proceed"}
        </Button>
      </form>
    </div>
  );
};

export default DemoCreatorDetails;
