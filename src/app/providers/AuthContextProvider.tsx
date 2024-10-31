"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, createContext, ReactNode } from "react";
import axios from "axios";
import { UserData } from "@/types";

const AuthContext = createContext(null);

function AuthContextProvider({ children }: { children: ReactNode }) {
  // Check auth status
  const { data: user } = useQuery({
    queryKey: ["user-status"],
    queryFn: async () => {
      const res = await axios.get("/backend/auth/logedin", {
        withCredentials: true,
      });
      if (res.status === 200 && res.data.logedIn) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return res.data.user;
      } else {
        location.href = "/auth/signin";
      }
      return null; // return null if not logged in
    },
  });

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const user = useContext(AuthContext) as UserData | null;
  console.log(user);
  return user;
};

export default AuthContextProvider;
