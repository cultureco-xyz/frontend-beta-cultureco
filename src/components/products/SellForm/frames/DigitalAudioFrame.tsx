import * as React from "react";
import { twMerge } from "tailwind-merge";

export const DigitalAudioFrame = ({
  imageUrl,
  className,
}: {
  imageUrl: string;
  className: string;
}) => {
  const img0 = Math.random() * 1000;
  return (
    <svg
      width={361}
      height={480}
      viewBox="0 0 361 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={twMerge("", className)}
    >
      <g clipPath={`url(#clip0_${img0})`}>
        <g clipPath={`url(#clip1_${img0})`}>
          <g filter={`url(#filter0_d_${img0})`}>
            <rect width={361} height={317} fill="#D9D9D9" />
            <rect width={361} height={317} fill={`url(#pattern0_${img0})`} />
          </g>
          <rect
            width={360}
            height={163}
            transform="translate(0 317)"
            fill="#282B28"
          />
          <rect
            width={360}
            height={163}
            transform="translate(0 317)"
            fill={`url(#pattern1_${img0})`}
            fillOpacity={0.5}
            style={{ mixBlendMode: "luminosity" }}
          />
        </g>
        <mask id={`path-4-inside-1_${img0}`} fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 16V464H4V472H8V476H16V480H345V476H353V472H357V464H361V16H357V8H353V4H345V0H16V4H8V8H4V16H0Z"
          />
        </mask>
        <path
          d="M0 16V14H-2V16H0ZM0 464H-2V466H0V464ZM4 464H6V462H4V464ZM4 472H2V474H4V472ZM8 472H10V470H8V472ZM8 476H6V478H8V476ZM16 476H18V474H16V476ZM16 480H14V482H16V480ZM345 480V482H347V480H345ZM345 476V474H343V476H345ZM353 476V478H355V476H353ZM353 472V470H351V472H353ZM357 472V474H359V472H357ZM357 464V462H355V464H357ZM361 464V466H363V464H361ZM361 16H363V14H361V16ZM357 16H355V18H357V16ZM357 8H359V6H357V8ZM353 8H351V10H353V8ZM353 4H355V2H353V4ZM345 4H343V6H345V4ZM345 0H347V-2H345V0ZM16 0V-2H14V0H16ZM16 4V6H18V4H16ZM8 4V2H6V4H8ZM8 8V10H10V8H8ZM4 8V6H2V8H4ZM4 16V18H6V16H4ZM-2 16V464H2V16H-2ZM0 466H4V462H0V466ZM2 464V472H6V464H2ZM4 474H8V470H4V474ZM6 472V476H10V472H6ZM8 478H16V474H8V478ZM14 476V480H18V476H14ZM16 482H345V478H16V482ZM347 480V476H343V480H347ZM345 478H353V474H345V478ZM355 476V472H351V476H355ZM353 474H357V470H353V474ZM359 472V464H355V472H359ZM357 466H361V462H357V466ZM363 464V16H359V464H363ZM361 14H357V18H361V14ZM359 16V8H355V16H359ZM357 6H353V10H357V6ZM355 8V4H351V8H355ZM353 2H345V6H353V2ZM347 4V0H343V4H347ZM345 -2H16V2H345V-2ZM14 0V4H18V0H14ZM16 2H8V6H16V2ZM6 4V8H10V4H6ZM8 6H4V10H8V6ZM2 8V16H6V8H2ZM4 14H0V18H4V14Z"
          fill="#ECECEC"
          mask={`url(#path-4-inside-1_${img0})`}
        />
      </g>
      <defs>
        <filter
          id={`filter0_d_${img0}`}
          x={-15}
          y={-7}
          width={391}
          height={347}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={8} />
          <feGaussianBlur stdDeviation={7.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result={`effect1_dropShadow_${img0}`}
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2={`effect1_dropShadow_${img0}`}
            result="shape"
          />
        </filter>
        <pattern
          id={`pattern0_${img0}`}
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref={`#image0_${img0}`}
            transform="matrix(0.000609756 0 0 0.000694391 0 -0.319381)"
          />
        </pattern>
        <pattern
          id={`pattern1_${img0}`}
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref={`#image1_${img0}`}
            transform="matrix(0.00168067 0 0 0.00368928 0 -1.32742)"
          />
        </pattern>
        <clipPath id={`clip0_${img0}`}>
          <rect width={361} height={480} fill="white" />
        </clipPath>
        <clipPath id={`clip1_${img0}`}>
          <rect width={361} height={480} rx={28} fill="white" />
        </clipPath>

        <image
          id={`image0_${img0}`}
          width={1640}
          height={2360}
          xlinkHref={imageUrl || "/splash-bg.png"}
          preserveAspectRatio="xMidYMid slice"
        />

        <image
          id={`image1_${img0}`}
          width={595}
          height={594}
          xlinkHref={"/audio-frame-bg-full.png"}
          preserveAspectRatio="xMidYMid slice"
        />
      </defs>
    </svg>
  );
};
