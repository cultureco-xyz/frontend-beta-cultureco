import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { motion } from "framer-motion";

function Intro() {
  return (
    <div className="fixed left-0 right-0 top-0 w-full h-screen z-0 mx-auto max-w-[430px]">
      <div className="flex w-full h-screen relative flex-col">
        <motion.svg
          initial={{
            y: 500,
          }}
          animate={{
            y: [500, 100, 100, 100, 180],
          }}
          transition={{
            duration: 3,
            times: [0, 0.3, 0.4, 0.5, 1],
          }}
          className="left-0 right-0 w-full  "
          xmlns="http://www.w3.org/2000/svg"
          width="393"
          height="705"
          fill="none"
          viewBox="0 0 393 705"
        >
          <path
            fill="#322926"
            d="M-243.04 430.492c91.007-79.945 181.97-159.846 275.148-154.386 93.134 5.504 188.438 96.413 289.585 139.903 101.192 43.446 208.228 39.473 315.308 35.456L207.467 880.999-243.04 430.492z"
          ></path>
          <path
            fill="#4B3127"
            d="M-186.718 486.817c79.637-69.958 159.23-139.871 240.737-135.094 81.508 4.777 164.889 84.379 253.443 122.394 88.511 38.06 182.15 34.577 275.833 31.05L207.464 880.999l-394.182-394.182z"
          ></path>
          <path
            fill="#643827"
            d="M-130.388 543.142C-62.122 483.173 6.054 423.201 75.939 427.341c69.838 4.094 141.294 72.298 217.21 104.883 75.873 32.629 156.205 29.639 236.448 26.647L207.469 880.999l-337.857-337.857z"
          ></path>
          <path
            fill="#7D3F28"
            d="M-74.067 599.467C-17.26 549.483 39.635 499.5 97.85 502.957c58.258 3.414 117.789 60.22 181.024 87.418 63.235 27.199 130.125 24.653 197.017 22.198L207.466 880.999-74.067 599.467z"
          ></path>
          <path
            fill="#964528"
            d="M-17.79 655.746c45.481-39.951 91.007-79.945 137.552-77.171 46.588 2.73 94.24 48.184 144.791 69.906 50.641 21.724 104.137 19.759 157.677 17.751L207.463 880.999-17.791 655.746z"
          ></path>
          <path
            fill="#B14C27"
            d="M38.537 712.071c34.111-29.963 68.267-59.97 103.186-57.923 34.919 2.047 70.648 36.194 108.561 52.485 38.003 16.294 78.103 14.82 118.246 13.302L207.466 880.999 38.537 712.071z"
          ></path>
          <path
            fill="#CB5226"
            d="M112.036 713.305c18.914-16.614 37.79-33.267 57.202-32.131 19.338 1.135 39.136 20.056 60.233 29.091 21.023 9.034 43.307 8.218 65.517 7.4l-89.296 89.296-93.656-93.656z"
          ></path>
        </motion.svg>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.5, 1, 0.9, 0],
          }}
          transition={{
            duration: 3,
            times: [0, 0.3, 0.4, 0.8, 1],
          }}
          className=" flex flex-col absolute left-0 right-0 top-[30%]  justify-center items-center font-fredokaSemiBold text-cultureOrange text-3xl"
        >
          <CultureCoLogoIcon fillColor="#FE621D" size={42} />
          <span className="relative">
            <h1 className="text-cultureOrange">CultureCo</h1>
            <span className="text-black bg-digitalMusicGreen absolute right-[15px] bottom-0 -rotate-[8deg]  w-[30px] flex items-center justify-center text-[10px] font-groteskSemiBold rounded-lg">
              Beta
            </span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default Intro;
