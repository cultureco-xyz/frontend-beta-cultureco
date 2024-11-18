import { UserData } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAuthenticated = () => {
  const [isLogedIn, setisLogedIn] = useState(false);
  const [user, setuser] = useState<UserData>();

  useEffect(() => {
    axios
      .get("/backend/auth/logedin", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.logedIn) {
            setisLogedIn(true);
            setuser(res.data.user);
          }
        }
      });
  }, []);

  return { isLogedIn, user };
};
