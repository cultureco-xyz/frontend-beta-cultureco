"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const EmptyStateUserFeed = () => {
  const router = useRouter();
  const handleExploreClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img
        src="/images/profile-empty-state.svg"
        alt="Empty State"
        className=""
      />
      <div className="text-cultureWhite text-sm flex font-groteskSemiBold">
        Posts by creators you follow will show up here!
      </div>
      <motion.button onClick={handleExploreClick} whileTap={{ scale: 0.95 }}>
        <div className="rounded-md text-sm mt-2 text-black bg-cultureOrange w-40 h-8 flex items-center justify-center text-nowrap font-groteskSemiBold">
          Explore Creators
        </div>
      </motion.button>
    </div>
  );
};

export default EmptyStateUserFeed;
