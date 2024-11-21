"use client";

import { useAuthContext } from "../providers/AuthContextProvider";
import CreatorProfile from "@/components/account/creator";
import UserProfile from "@/components/account/user";

function Page() {
  const user = useAuthContext();
  // show different screens based on users
  if (user?.role == "creator") {
    return <CreatorProfile />;
  }
  if (user?.role == "user") {
    return <UserProfile />;
  }
}

export default Page;
