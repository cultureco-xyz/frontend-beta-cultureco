import { Button } from "@/components/ui/button";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";

export const Collaborator = ({
  collaborator,
  setCollaborator,
}: {
  collaborator: string;
  setCollaborator: (c: string) => void;
}) => {
  const [openList, setopenList] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [result, setresult] = useState<UserData[]>([]);
  const usrList = useQuery({
    queryKey: ["collab-list"],
    queryFn: async () => {
      const res = await axios.get("/backend/user/get-all-creators");
      return res.data as UserData[];
    },
  });

  const options = {
    includeScore: true,
    keys: ["name", "username"],
  };

  const fuse = new Fuse(usrList.data || [], options);

  useEffect(() => {
    if (searchTerm) {
      const res = fuse.search(searchTerm);
      setresult(res.map((r) => r.item));
    }
  }, [usrList.data, searchTerm]);

  let creatorName = "";

  if (usrList.isSuccess && collaborator) {
    creatorName = usrList.data.find((ele) => `${ele._id}` == collaborator)
      ?.name as string;
  }

  return (
    <div className="w-full mb-2 text-cultureWhite">
      <p className="text-xs">Add Collaborator</p>
      <Button
        onClick={() => {
          setopenList(true);
        }}
        variant={"outline"}
        className="text-cultureOrange bg-[#2E2F32] h-[42px] w-full"
      >
        {collaborator ? creatorName : "Choose Creator"}
        <ChevronDown className="ml-2" />
      </Button>
      <p className="opacity-[0.5] text-xs">
        Did you work on this with another Creator
      </p>
      {openList && (
        <motion.div
          initial={{
            y: "100%",
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: "100%",
          }}
          className="flex py-2 flex-col rounded-t-lg fixed left-0 right-0 bottom-0 max-w-[430px] w-full mx-auto bg-[#282B28] h-[500px]  z-50"
        >
          <div className="flex w-full">
            <Button
              onClick={() => {
                setopenList(false);
              }}
              className="font-groteskMedium text-sm w-fit"
            >
              <ChevronLeft className="h-[19px]" />
              Back
            </Button>
          </div>
          <div className="flex flex-col p-4 pt-2 h-full">
            <span className="flex items-center bg-white rounded-md p-1">
              <Search className="h-4 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => {
                  setsearchTerm(e.target.value);
                }}
                className="text-black bg-transparent text-sm active:border-none active:outline-none focus:outline-none"
                placeholder="Search"
                type="text"
              />
            </span>
            <span className="flex flex-col w-full gap-5 mt-6 h-full overflow-y-auto pb-12">
              {usrList.isSuccess &&
                searchTerm.length == 0 &&
                usrList.data.map((ele, idx) => {
                  return (
                    <div
                      onClick={() => {
                        setCollaborator(`${ele._id}`);
                        setopenList(false);
                      }}
                      style={
                        collaborator == `${ele._id}`
                          ? {
                              color: "#FE621D",
                            }
                          : {}
                      }
                      key={`${ele._id}` + idx}
                      className="flex font-groteskRegular items-center gap-2"
                    >
                      <img
                        className="h-6 w-6 rounded-full"
                        src={ele.profilePicture}
                        alt=""
                      />
                      <p className="text-md">{ele.name}</p>
                    </div>
                  );
                })}
              {usrList.isSuccess &&
                searchTerm.length > 0 &&
                result.map((ele, idx) => {
                  return (
                    <div
                      onClick={() => {
                        setCollaborator(`${ele._id}`);
                        setopenList(false);
                      }}
                      style={
                        collaborator == `${ele._id}`
                          ? {
                              color: "#FE621D",
                            }
                          : {}
                      }
                      key={`${ele._id}` + idx}
                      className="flex font-groteskRegular items-center gap-2"
                    >
                      <img
                        className="h-6 w-6 rounded-full"
                        src={ele.profilePicture}
                        alt=""
                      />
                      <p className="text-md">{ele.name}</p>
                    </div>
                  );
                })}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
