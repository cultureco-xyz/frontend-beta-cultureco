import React from "react";

const DigitalFrame = ({
  className,
  image,
}: {
  className?: string;
  image?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="361"
      height="480"
      fill="none"
      viewBox="0 0 361 480"
      className={className}
    >
      <mask id="path-1-inside-1_5061_75414" fill="#fff">
        <path
          fillRule="evenodd"
          d="M0 16v448h4v8h4v4h8v4h329v-4h8v-4h4v-8h4V16h-4V8h-4V4h-8V0H16v4H8v4H4v8z"
          clipRule="evenodd"
        ></path>
      </mask>
      <path
        fill="url(#pattern0_5061_75414)"
        fillRule="evenodd"
        d="M0 16v448h4v8h4v4h8v4h329v-4h8v-4h4v-8h4V16h-4V8h-4V4h-8V0H16v4H8v4H4v8z"
        clipRule="evenodd"
      ></path>
      <path
        fill="url(#paint0_linear_5061_75414)"
        fillRule="evenodd"
        d="M0 16v448h4v8h4v4h8v4h329v-4h8v-4h4v-8h4V16h-4V8h-4V4h-8V0H16v4H8v4H4v8z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#ECECEC"
        d="M0 16v-2h-2v2zm0 448h-2v2h2zm4 0h2v-2H4zm0 8H2v2h2zm4 0h2v-2H8zm0 4H6v2h2zm8 0h2v-2h-2zm0 4h-2v2h2zm329 0v2h2v-2zm0-4v-2h-2v2zm8 0v2h2v-2zm0-4v-2h-2v2zm4 0v2h2v-2zm0-8v-2h-2v2zm4 0v2h2v-2zm0-448h2v-2h-2zm-4 0h-2v2h2zm0-8h2V6h-2zm-4 0h-2v2h2zm0-4h2V2h-2zm-8 0h-2v2h2zm0-4h2v-2h-2zM16 0v-2h-2v2zm0 4v2h2V4zM8 4V2H6v2zm0 4v2h2V8zM4 8V6H2v2zm0 8v2h2v-2zm-6 0v448h4V16zm2 450h4v-4H0zm2-2v8h4v-8zm2 10h4v-4H4zm2-2v4h4v-4zm2 6h8v-4H8zm6-2v4h4v-4zm2 6h329v-4H16zm331-2v-4h-4v4zm-2-2h8v-4h-8zm10-2v-4h-4v4zm-2-2h4v-4h-4zm6-2v-8h-4v8zm-2-6h4v-4h-4zm6-2V16h-4v448zm-2-450h-4v4h4zm-2 2V8h-4v8zm-2-10h-4v4h4zm-2 2V4h-4v4zm-2-6h-8v4h8zm-6 2V0h-4v4zm-2-6H16v4h329zM14 0v4h4V0zm2 2H8v4h8zM6 4v4h4V4zm2 2H4v4h4zM2 8v8h4V8zm2 6H0v4h4z"
        mask="url(#path-1-inside-1_5061_75414)"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5061_75414"
          x1="181"
          x2="180.5"
          y1="261.5"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0"></stop>
          <stop offset="1"></stop>
        </linearGradient>
        <pattern
          id="pattern0_5061_75414"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref="#image0_5061_75414"
            transform="matrix(.00138 0 0 .00119 -.075 -.051)"
          ></use>
        </pattern>
        <image
          xlinkHref={image || "/splash-bg.png"}
          id="image0_5061_75414"
          width="832"
          height="928"
          className="object-cover"
          preserveAspectRatio="xMidYMid slice"
        ></image>
      </defs>
    </svg>
  );
};

export default DigitalFrame;
