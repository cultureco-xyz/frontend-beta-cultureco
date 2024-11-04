import { ChevronLeft, CircleCheck } from "lucide-react";
import UploadCircle from "@/assets/svgs/upload-circle";
import { Button } from "@/components/ui/button";

import { create } from "zustand";
import Spinner from "@/components/common/spinner";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import { UserData } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { handleProfilePicUpload } from "@/lib/utils";
import { h1 } from "framer-motion/client";

// enum CREATOR_TYPES {
//   ARTIST = "Artist",
//   MUSICIAN = "Musician",
// }

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

const ToggleFormElments = (isEnabled: boolean) => {
  const form = document.getElementById("claim-form") as HTMLFormElement;
  if (form) {
    // Convert form.elements to an array to iterate over it
    Array.from(form.elements).forEach((element) => {
      (element as HTMLInputElement).disabled = isEnabled;
    });
  }
};

const ClaimDemoCreator = () => {
  const { name, bio, creatorType, profilePicture, setValue } =
    useCreatorStore();
  const [demoCreatorID, setdemoCreatorID] = useState("");
  const [profilePicUploadProgress, setProfilePicUploadProgress] =
    useState<number>();
  const [claimCode, setclaimCode] = useState("");
  const [formDisable, setformDisable] = useState(true);

  useEffect(() => {
    ToggleFormElments(formDisable);
  }, [formDisable]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const urlParams = new URLSearchParams(window.location.search);
    const did = urlParams.get("did");
    if (did) {
      setdemoCreatorID(did);
    } else {
      location.href = "/";
    }

    if (demoCreatorID) {
      //fetch demo creator details
      axios
        .post("/backend/user/get-user-by-id", {
          userID: demoCreatorID,
        })
        .then((user) => {
          const userData = user.data;
          setValue("name", userData.name);
          setValue("bio", userData.bio);
          setValue("profilePicture", userData.profilePicture);
        });
    }
  }, [demoCreatorID]);

  const verifyClaimCode = async () => {
    const res = await axios.post("/backend/user/verify-claim-code", {
      demoCreatorID: demoCreatorID,
      claimCode: claimCode,
    });
    if (res.status == 200 && res.data.isValid) {
      setformDisable(false);
    } else {
      alert("Code Invalid");
    }
  };

  const updateDetails = async () => {
    if (formDisable) {
      return null;
    }
    const res = await axios.post(
      "/backend/user/claim-demo-creator",
      {
        name,
        bio,
        profilePicture,
        demoUserID: demoCreatorID,
        claimCode: claimCode,
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
      <div className="flex flex-col">
        <h1 className="text-lg text-white mt-4">Claim your creator profile</h1>
        <label className="mt-2 text-white" htmlFor="">
          <p className="text-cultureOrange font-groteskSemiBold">
            Claim code*:
          </p>
          {formDisable ? (
            <span className="mt-1 flex items-center px-2 pr-0 w-full h-[41px] bg-cultureGray border-cultureOrange border-[1px] rounded-lg">
              <input
                value={claimCode}
                onChange={(e) => {
                  setclaimCode(e.target.value);
                }}
                required
                placeholder="Enter Claim code"
                type="text"
                className="bg-transparent w-full h-full hover:outline-none active:outline-none hover:border-none active:border-none"
              />
              <Button
                onClick={verifyClaimCode}
                className="bg-cultureOrange text-white h-full rounded-l-none"
              >
                Verify
              </Button>
            </span>
          ) : (
            <h1 className="text-cultureGreen uppercase flex items-center gap-2 text-xl">
              Claim code verified <CircleCheck />
            </h1>
          )}
        </label>
      </div>
      <form
        style={{
          opacity: formDisable ? 0.4 : 1,
        }}
        id="claim-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateDetails();
        }}
        className="flex h-full flex-col w-full text-white px-2 mt-3"
      >
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

export default ClaimDemoCreator;
