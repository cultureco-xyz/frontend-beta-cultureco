"use client";
import axios from "axios";
import React from "react";
import { useAuthContext } from "../providers/AuthContextProvider";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/navigation/topNav";

function Page() {
  const user = useAuthContext();
  console.log(user);
  return (
    <div className="flex flex-col w-full min-h-svh">
      <TopNav />
      {user && (
        <div className="text-cultureOrange flex flex-col items-center mt-36">
          <div>name: {user.name}</div>
          <div>username : {user.username}</div>
          <div>bio: {user.bio}</div>
          <Button
            variant={"outline"}
            onClick={() => {
              axios.get("/backend/auth/logout").then((res) => {
                if (res.status == 200) {
                  localStorage.removeItem("user");
                  location.reload();
                }
              });
            }}
          >
            Logo out
          </Button>
        </div>
      )}
    </div>
  );
}

export default Page;
