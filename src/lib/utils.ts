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

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + "...";
}

export function formatDateAndTime(dateString: string) {
  const date = new Date(dateString);

  // Array to map month index to month name
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get month name
  const monthName = monthNames[date.getMonth()]; // getMonth() returns month index (0-11)

  // Get day of the month
  const day = date.getDate();

  // Get year
  const year = date.getFullYear();

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // add leading zero if needed

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  // Format date and time
  return { monthName, day, year, hours, minutes, ampm };
}

export const checkUsernameAvailability = async (username: string): Promise<{ valid: boolean; message: string }> => {
  try {
    const response = await axios.post(
      "/backend/user/check-username",
      { username },
      { withCredentials: true } // Ensure cookies are sent if needed
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Handle server-side errors
      return error.response.data;
    }
    throw new Error("Unable to connect to the server. Please try again.");
  }
};
