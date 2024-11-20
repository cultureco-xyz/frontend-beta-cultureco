import { Button } from "@/components/ui/button";
import { IAlbum } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { handleProfilePicUpload } from "../../../lib/utils";
import Spinner from "@/components/common/spinner";

const AlbumConfig = ({
  userID,
  album,
  setalbum,
}: {
  userID: string;
  album: string;
  setalbum: (al: string) => void;
}) => {
  const [open, setopen] = useState(false);
  const [showUpload, setshowUpload] = useState(false);
  const [title, settitle] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [imageUplodaLoading, setimageUplodaLoading] = useState(false);

  const myAlbums = useQuery({
    queryKey: ["my albums", userID],
    queryFn: async () => {
      const res = await axios.get(`/backend/album/users/${userID}`);
      return res.data as IAlbum[];
    },
  });

  //create album
  const createAlbum = useMutation({
    mutationKey: ["create-album", userID],
    mutationFn: async () => {
      const res = await axios.post(`/backend/album/create`, {
        name: title,
        cover_url: imageUrl,
      });
      return res.data;
    },
    onSuccess: () => {
      setshowUpload(false);
      myAlbums.refetch();
    },
  });

  let selectedAlbum = "";
  if (album) {
    selectedAlbum = myAlbums.isSuccess
      ? `${myAlbums.data.find((ele) => ele._id == album)?.name}`
      : "";
  }

  return (
    <div className="flex flex-col mb-2 text-cultureWhite">
      <p className="text-xs">Album</p>
      <Button
        onClick={() => {
          setshowUpload(false);
          setopen(true);
        }}
        variant={"outline"}
        className="text-cultureOrange bg-[#2E2F32] h-[42px] w-full"
      >
        {selectedAlbum ? selectedAlbum : "Add to Album"}
        <ChevronDown className="ml-2" />
      </Button>
      <p className="opacity-[0.5] text-xs">Will this be a part of an Album?</p>
      {open && (
        <motion.div
          initial={{
            y: "100%",
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: "100%",
          }}
          className="flex py-2 flex-col rounded-t-lg fixed left-0 right-0 bottom-0 max-w-[430px] w-full mx-auto bg-[#151715] h-fit  z-50 mb-[56px]"
        >
          <div className="flex w-full">
            <Button
              onClick={() => {
                setopen(false);
              }}
              className="font-groteskMedium text-sm w-fit"
            >
              <ChevronLeft className="h-[19px]" />
              Back
            </Button>
          </div>
          {showUpload ? (
            <div className="flex flex-col w-full h-fit justify-center items-center cursor-pointer">
              <label htmlFor="fileUploadAlbum" className=" relative">
                <img
                  src={imageUrl || "/grad-bg.png"}
                  style={{
                    borderRadius: "14px",
                  }}
                  className="h-[165px] w-[165px] object-cover"
                  alt=""
                />
                <input
                  onChange={(e) => {
                    handleProfilePicUpload(e, {
                      setValue: (imgurl) => {
                        setimageUrl(imgurl);
                      },
                      setProgress: (pr) => {
                        if (pr) {
                          setimageUplodaLoading(true);
                        } else {
                          setimageUplodaLoading(false);
                        }
                      },
                    });
                  }}
                  id="fileUploadAlbum"
                  className="h-0 w-0 invisible"
                  type="file"
                />
                {imageUplodaLoading && (
                  <Spinner className="absolute left-0 right-0 top-0 bottom-[15%] mx-auto my-auto" />
                )}
              </label>
              <input
                placeholder="Album Title"
                className="bg-transparent w-[165px] text-2xl  border-b border-b-white placeholder:text-gray-500 text-center"
                type="text"
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  createAlbum.mutate();
                }}
                variant={"outline"}
                className="mt-3 w-[165px] hover:text-cultureOrange"
              >
                Upload
              </Button>
              <p
                onClick={() => {
                  setshowUpload(false);
                }}
                className="text-xs mt-2 text-cultureOrange border-b border-b-cultureOrange"
              >
                Close
              </p>
            </div>
          ) : (
            <div className="flex flex-col p-4 gap-4 w-full h-fit">
              <AddAlbum
                onClick={() => {
                  setshowUpload(true);
                }}
              />
              {myAlbums.isSuccess &&
                myAlbums.data.map((ele) => {
                  return (
                    <div
                      onClick={() => {
                        setalbum(ele._id);
                        setopen(false);
                      }}
                      key={ele._id}
                      className="flex font-groteskRegular items-center gap-2 cursor-pointer"
                    >
                      <img
                        className="h-6 w-6 rounded-full"
                        src={ele.cover_url}
                        alt=""
                      />
                      <p
                        style={
                          selectedAlbum == ele._id
                            ? {
                                color: "#FE621D",
                              }
                            : {}
                        }
                        className="text-md"
                      >
                        {ele.name}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const AddAlbum = ({ onClick }: { onClick: () => void }) => {
  return (
    <div onClick={onClick} className="flex cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        fill="none"
        viewBox="0 0 21 21"
      >
        <path
          fill="#FE621D"
          d="M9.067 6.004l.184-.005h7.5a3.25 3.25 0 013.245 3.065l.005.185v1.56a6.502 6.502 0 00-1.5-1.077v-.483a1.75 1.75 0 00-1.75-1.75h-7.5a1.75 1.75 0 00-1.744 1.606l-.006.144v7.5a1.75 1.75 0 001.607 1.744l.143.006h.482c.287.55.65 1.055 1.076 1.5H9.25a3.25 3.25 0 01-3.245-3.066L6 16.75v-7.5a3.25 3.25 0 013.066-3.245m4.516-3.771l.052.177.693 2.588h-1.553l-.588-2.2a1.75 1.75 0 00-2.144-1.238L2.799 3.5a1.75 1.75 0 00-1.27 1.996l.032.148 1.942 7.244A1.75 1.75 0 005 14.176v1.506a3.25 3.25 0 01-2.895-2.228l-.052-.176L.113 6.033a3.25 3.25 0 012.12-3.928l.178-.052L9.655.112a3.25 3.25 0 013.928 2.12M21 15.5a5.5 5.5 0 10-11 0 5.5 5.5 0 0011 0zm-5.59-3.493L15.5 12l.09.008a.5.5 0 01.402.402l.008.09V15h2.505l.09.009a.5.5 0 01.402.402l.008.09-.008.09a.5.5 0 01-.403.402l-.09.008h-2.503v2.503l-.008.09a.5.5 0 01-.402.402l-.09.008-.09-.008a.5.5 0 01-.402-.402l-.008-.09V16h-2.503l-.09-.008a.5.5 0 01-.402-.402l-.008-.09.008-.09a.5.5 0 01.402-.402l.09-.008H15v-2.5l.008-.09a.5.5 0 01.402-.403z"
        ></path>
      </svg>
      <p className="text-cultureOrange text-base ml-2">Create Album</p>
    </div>
  );
};

export { AlbumConfig };
