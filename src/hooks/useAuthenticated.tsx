import axios from "axios";
import { useEffect, useState } from "react";

const authCheck = async () => {
  const res = await axios.get("/backend/auth/logedin", {
    withCredentials: true,
  });
  if (res.status === 200 && res.data.logedIn) {
    return true;
  } else {
    return false;
  }
  return false;
};

export const useAuthenticated = () => {
  const [isLogedIn, setisLogedIn] = useState(false);

  useEffect(() => {
    authCheck().then((res) => {
      if (res) {
        setisLogedIn(true);
      }
    });
  }, []);

  return isLogedIn;
};
