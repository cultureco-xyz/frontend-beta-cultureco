"use client";
import axios from "axios";
import React from "react";

function Page() {
  return (
    <div>
      <button
        onClick={() => {
          axios.get("/backend/auth/logout").then((res) => {
            if (res.status == 200) {
              location.reload();
            }
          });
        }}
      >
        Logo out
      </button>
    </div>
  );
}

export default Page;
