"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import React, { ReactNode } from "react";
const clientId = process.env.GOOGLE_CLIENT_ID as string;
function GoogleAuthProvider({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}

export default GoogleAuthProvider;
