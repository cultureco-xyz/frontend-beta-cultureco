import { handleProfilePicUpload, truncateText } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

const AudioUpload = ({
  songName,
  artist,
  setSongName,
  setSongArtist,
  audioUrl,
  setaudioUrl,
}: {
  songName: string;
  artist: string;
  audioUrl: string;
  setSongName: (name: string) => void;
  setSongArtist: (name: string) => void;
  setaudioUrl: (name: string) => void;
}) => {
  const [loading, setloading] = useState(false);

  return (
    <div className="flex rounded-lg mt-2  w-[361px] h-[82px] bg-[#282B28] p-2 items-center text-cultureWhite">
      <p className="text-[20px] font-bold text-cultureOrange">1</p>
      <span className="flex flex-col gap-2 ml-2">
        <input
          value={songName}
          className="h-[24px] rounded-sm text-sm  border-cultureOrange border-[1px] bg-transparent"
          type="text"
          placeholder="Track name"
          onChange={(e) => {
            setSongName(e.target.value);
          }}
        />
        <input
          value={artist}
          className="h-[24px] rounded-sm text-xs w-[90px] border-cultureOrange border-[1px] bg-transparent"
          type="text bg-transparent"
          onChange={(e) => {
            setSongArtist(e.target.value);
          }}
          placeholder="Artist name"
        />
      </span>

      <label
        style={{
          borderColor: audioUrl.length > 0 ? "#FE621D" : "white",
        }}
        htmlFor="fileUploadAudio"
        className="h-[66px] rounded-sm flex justify-center items-center  w-[132px] ml-auto border-white border-2 bg-transparent"
      >
        {audioUrl.length > 0 ? (
          <span className="text-[#FE621D] flex gap-1">
            <span className="flex flex-col">
              <p className="text-sm"> File Uploaded</p>
              <p className="text-xs"> {truncateText(songName, 16)}</p>
            </span>

            <CircleCheck className="bg-cultureOrange text-[#282b28] rounded-full" />
          </span>
        ) : loading ? (
          <p>Uploading...</p>
        ) : (
          <p>Upload Music</p>
        )}
        <input
          onChange={(e) => {
            handleProfilePicUpload(e, {
              setProgress: (t) => {
                if (t) {
                  setloading(true);
                } else {
                  setloading(false);
                }
              },
              setValue: (url) => {
                setaudioUrl(url);
              },
            });
          }}
          id="fileUploadAudio"
          className="h-0 w-0 invisible"
          type="file"
        />
      </label>
    </div>
  );
};

export { AudioUpload };
