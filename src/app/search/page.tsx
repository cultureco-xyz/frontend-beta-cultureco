"use client";
import BottomNav from "@/components/navigation/bottomNav";
import TopNav from "@/components/navigation/topNav";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Fuse from "fuse.js";

import React, { useEffect, useState } from "react";

const FetchAllCreators = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [result, setresult] = useState<UserData[]>([]);

  const users = useQuery({
    queryKey: ["all-creators"],
    queryFn: async () => {
      const res = await axios("/backend/user/get-all-creators");
      return res.data as UserData[];
    },
  });

  const options = {
    includeScore: true,
    keys: ["name", "username"],
  };

  const fuse = new Fuse(users.data || [], options);

  useEffect(() => {
    if (searchTerm) {
      const result = fuse.search(searchTerm);
      setresult(result.map((r) => r.item) as UserData[]);
    }
  }, [users.data, searchTerm]);

  return (
    <div className="flex flex-col h-svh">
      <TopNav />
      <div className="p-8 px-6 w-full h-full items-center flex flex-col mt-12">
        <input
          type="text"
          placeholder="Search (username or name)"
          value={searchTerm}
          className="w-full h-12 p-2 bg-cultureGrayVariant text-white border-b-cultureOrange border-b-2"
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
        />
        <div className="flex flex-col w-full gap-5 my-4 h-full overflow-y-auto">
          {users.isSuccess &&
            (searchTerm.length == 0 ? users.data : result).map((ele, key) => {
              return (
                <div key={key + ele.username} className="flex justify-between">
                  <span className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={ele.profilePicture}
                      alt=""
                    />
                    <span className="flex flex-col gap-[1px]">
                      <span className="text-white text-lg">{ele.name}</span>
                      <span className="text-cultureOrange text-sm">
                        @{ele.username}
                      </span>
                    </span>
                  </span>
                  <div className="flex gap-2 text-white text-lg">
                    {ele.isDemo && !ele.isClaimed && (
                      <Button
                        onClick={() => {
                          location.href = `/auth/signin?step=claim-profile&did=${ele._id}`;
                        }}
                        className="text-cultureOrange"
                        variant={"outline"}
                      >
                        Claim
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        location.href = `/profile/${ele._id}`;
                      }}
                      className="bg-cultureOrange"
                    >
                      View
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <BottomNav className=" bottom-0 w-full max-w-mobile" />
    </div>
  );
};

export default FetchAllCreators;
