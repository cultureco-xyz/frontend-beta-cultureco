import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export const handleProfilePicUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  {
    setValue,
    setProgress,
  }: {
    setValue: (v: string) => void;
    setProgress: (p: number | undefined) => void;
  }
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
          setProgress(progress);
        }
      },
    });

    if (uploadResponse.status === 200) {
      const imageUrl = `https://dkrwjr7mnvu4o.cloudfront.net/${key}`;
      setValue(imageUrl);
      // onProfilePicUpload(imageUrl);
      setProgress(undefined);
    }
  }
};
