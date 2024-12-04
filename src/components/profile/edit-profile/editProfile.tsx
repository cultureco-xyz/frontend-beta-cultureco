import React, { useEffect, useState } from "react";
import axios from "axios";
import { create } from "zustand";
import { User2 } from "lucide-react";
import UploadCircle from "@/assets/svgs/upload-circle";
import { handleProfilePicUpload } from "@/lib/utils";
import Spinner from "@/components/common/spinner";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types";
import { useDebounce } from "@/hooks/useDebounce"; // Import your debounce hook

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
  const { name, username, bio, profilePicture, setValue } = useStore();
  const [profilePicUploadProgress, setProfilePicUploadProgress] =
    useState<number>();
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailabilityMessage, setUsernameAvailabilityMessage] =
    useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Debounced username for efficient checking
  const debouncedUsername = useDebounce(username, 500); // 500ms debounce delay

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
    if (isUsernameTaken || usernameError) {
      return; // Don't allow saving if there are errors
    }

    setIsSaving(true);

    const lowerUsername = username.toLowerCase();

    try {
      const res = await axios.post(
        "/backend/user/update-profile",
        {
          username: lowerUsername,
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
    } finally {
      setIsSaving(false);
    }
  };

  // Check if the username is available (debounced check)
  useEffect(() => {
    // Don't check for current username
    if (debouncedUsername !== profile.username) {
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
    } else {
      setIsUsernameTaken(false); // Don't show error when it's the same username
      setUsernameAvailabilityMessage(""); // Clear availability message
    }

    // Only show the error message if the user has typed anything
    if (debouncedUsername.length === 0) {
      setUsernameError(""); // Clear the error message when the input is empty
    } else if (debouncedUsername.length < 5) {
      setUsernameError("Username must be at least 5 characters.");
    }
  }, [debouncedUsername, profile.username]);

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
              alt="Profile Picture"
            />
          )}
        </label>

        {/* Username */}
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
              onChange={handleUsernameChange} // Use the handler with disallowed chars
              className="bg-transparent w-full h-full hover:outline-none active:outline-none"
              maxLength={20} // Enforcing max length for username
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

        {/* Name */}
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
          <p>Bio (optional):</p>
          <span className="mt-1 py-1 flex items-center px-2 w-full h-auto bg-cultureGray border-white border-[1px] rounded-lg">
            <textarea
              value={bio}
              onChange={(e) => {
                setValue("bio", e.target.value);
              }}
              rows={3}
              placeholder="Tell us about yourself!"
              className="bg-transparent w-full hover:outline-none active:outline-none resize-none"
            />
          </span>
        </label>

        {/* Save Button */}
        <Button
          className="mt-6 h-[52px] text-cultureOrange bg-cultureGray font-groteskBold"
          type="submit"
          variant={"outline"}
          disabled={isUsernameTaken || Boolean(usernameError) || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
