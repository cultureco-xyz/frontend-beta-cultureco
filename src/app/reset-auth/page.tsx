"use client";
import axios from "axios";
import React, { useEffect } from "react";

function Page() {
  useEffect(() => {
    axios.get("/backend/auth/logout").then((res) => {
      if (res.status == 200) {
        localStorage.removeItem("user");
        location.href = "/";
      }
    });
  }, []);

  return <div>Reset Auth</div>;
}

export default Page;
