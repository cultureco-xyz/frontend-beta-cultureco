import React from "react";

//checks loged in status
//sets user cookies for getting user-data

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default layout;
