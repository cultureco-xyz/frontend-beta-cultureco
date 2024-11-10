import * as React from "react";
import { twMerge } from "tailwind-merge";

const TipJar = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="20"
    fill="none"
    viewBox="0 0 16 20"
    className={twMerge("", className)}
  >
    <path
      stroke="#FE621D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 1.5v1.882c0 .685.387 1.312 1 1.618s1 .933 1 1.618V15.5a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6.618C1 5.933 1.387 5.306 2 5s1-.933 1-1.618V1.5m-1 0h12"
    ></path>
    <path
      stroke="#FE621D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      d="M10.5 7.5H6h.75a2.25 2.25 0 1 1 0 4.5H6l2.25 2.25M6 9.75h4.5"
    ></path>
  </svg>
);

export default TipJar;
