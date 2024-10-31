import React from "react";
import AuthContextProvider from "../providers/AuthContextProvider";
//checks loged in status
//sets user cookies for getting user-data

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthContextProvider>{children}</AuthContextProvider>
    </>
  );
}

export default layout;
