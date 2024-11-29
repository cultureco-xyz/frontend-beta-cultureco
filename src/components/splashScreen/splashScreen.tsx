/* eslint-disable */
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import UserFeedIcon from "@/assets/svgs/user-feed.icon";
import UserIcon from "@/assets/svgs/user.icon";

function SplashScreen({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => any;
}) {
  const [steps, setsteps] = useState(1);
  const [enableSplash, setenableSplash] = useState(false);

  useEffect(() => {
    const check = localStorage.getItem("splash-complete");

    if (check && check == "true") {
      setenableSplash(false);
    } else {
      setenableSplash(true);
      localStorage.setItem("splash-complete", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {/* TO-DO: Replace with new images for all of the splash screen stuff */}
      {isOpen && enableSplash && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          exit={{
            opacity: 0,
          }}
          className=" flex justify-center items-center fixed left-0 right-0 top-0  max-w-[430px] h-[100dvh] mx-auto z-[999] bg-[#0002] backdrop-blur-[1px]"
        >
          <div
            style={{
              background: "url(/splash-bg.png)",
              overflow: "hidden",
              objectFit: "fill",
            }}
            className="relative rounded-[16px] py-8 flex-col border-[1px] border-[#ffffff36] overflow-hidden backdrop-blur-md flex w-[360px] h-[650px] "
          >
            <X
              className="right-0 top-0 absolute mt-[38px] mr-4"
              onClick={() => {
                close();
              }}
            />
            <motion.div className=" flex mx-auto h-fit  justify-center items-center font-fredokaSemiBold text-cultureOrange text-3xl">
              <CultureCoLogoIcon fillColor="#ECECEC" size={27} />
              <span className="relative">
                <motion.h1 className="text-cultureWhite text-[24px]">
                  CultureCo
                </motion.h1>
                <span className="text-black absolute text-[8px] right-[15px] bottom-0 -rotate-[8deg] bg-digitalMusicGreen w-[30px] flex items-center justify-center font-groteskSemiBold rounded-lg">
                  Beta
                </span>
              </span>
            </motion.div>
            {steps < 4 && (
              <>
                <div className="mt-[30px] w-full h-[280px] ">
                  {steps == 1 && (
                    <motion.img
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.7,
                      }}
                      src="/splash/splash-home.svg"
                      className="w-full"
                      alt=""
                    />
                  )}
                  {steps == 2 && (
                    <motion.img
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.7,
                      }}
                      src="/splash/splash-feed.svg"
                      className=" h-[280px] mx-auto"
                      alt=""
                    />
                  )}
                  {steps === 3 && (
                    <motion.img
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.7,
                      }}
                      src="/splash/splash-profile.svg"
                      className=" h-[280px] mx-auto"
                      alt=""
                    />
                  )}
                </div>
                {steps == 1 && (
                  <motion.h1
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="text-cultureWhite mx-auto w-[290px] text-center font-groteskBold mt-10"
                  >
                    Discover artists, collect art & join tribes from your{" "}
                    <span className="text-cultureOrange">Home Page.</span>
                  </motion.h1>
                )}
                {steps == 2 && (
                  <motion.h1
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="text-cultureWhite mx-auto w-[290px] text-center font-groteskBold    mt-10  "
                  >
                    Stay up to date on content from your tribes in your{" "}
                    <span className="text-cultureOrange">Feed</span>
                  </motion.h1>
                )}

                {steps == 3 && (
                  <motion.h1
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="text-cultureWhite mx-auto w-[290px] text-center font-groteskBold    mt-10  "
                  >
                    Earn badges & show them off with your collections on your{" "}
                    <span className="text-cultureOrange">Profile.</span>
                  </motion.h1>
                )}
                <div className="flex justify-between items-center w-[250px] mx-auto mt-6">
                  <CultureCoLogoIcon
                    fillColor={steps == 2 ? "#FE621D" : "#ECECEC"}
                  />
                  <UserFeedIcon
                    fillColor={steps == 1 ? "#FE621D" : "#ECECEC"}
                  />
                  <UserIcon fillColor={steps == 3 ? "#FE621D" : "#ECECEC"} />
                </div>
              </>
            )}
            {steps == 4 && <Message />}
            <Button
              onClick={() => {
                if (steps < 4) {
                  setsteps((st) => st + 1);
                } else {
                  close();
                }
              }}
              className="bg-[#2E2F32] mt-auto text-cultureOrange h-[50px] w-fit px-6 mx-auto border-cultureOrange border-[2px] rounded-lg font-groteskMedium"
            >
              {steps == 1 && "Next"}
              {steps == 2 && "Next"}
              {steps == 3 && "Start Collecting"}
              {steps == 4 && "Okay!"}
            </Button>
            <Pagination step={steps} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Message = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="flex my-auto flex-col items-center justify-center text-[14px] font-groteskMedium text-center mx-auto w-[80%]"
    >
      <p className="text-cultureBeige mb-2"> Note:</p>
      <p className="text-cultureOrange mb-4">This is a closed Beta.</p>
      <p className="text-cultureWhite">
        {" "}
        Please test extensively & reach out to us to report bugs.
      </p>
      <p className="text-cultureWhite mt-4"> Thank you, </p>
      <span className="text-cultureOrange ">Happy Beta testing!</span>
    </motion.div>
  );
};

const Pagination = ({ step }: { step: number }) => {
  const variants = {
    "1": { x: 0 },
    "2": { x: 15 },
    "3": { x: 30 },
    "4": { x: 0, width: "100%" },
  };

  return (
    <div className="flex mx-auto gap-2 relative mt-8">
      <span className="flex w-[9px] h-[9px] bg-cultureBeige rounded-full"></span>
      <span className="flex w-[9px] h-[9px] bg-cultureBeige rounded-full"></span>
      <span className="flex w-[9px] h-[9px] bg-cultureBeige rounded-full"></span>
      <span className="flex w-[9px] h-[9px] bg-cultureBeige rounded-full"></span>
      {/* track */}
      <motion.span
        initial={{
          x: 0,
        }}
        animate={`${step}`}
        variants={variants}
        className="flex absolute  bottom-0 left-0 bg-cultureOrange h-[9px] w-[30px] rounded-[8px]"
      ></motion.span>
    </div>
  );
};

export default SplashScreen;
