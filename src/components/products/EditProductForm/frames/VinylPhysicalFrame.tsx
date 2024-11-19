import { twMerge } from "tailwind-merge";

export function VinylPhysicalFrame({
  className,
  imageUrl,
}: {
  className?: string;
  imageUrl: string;
}) {
  const img0 = Math.random() * 1000;
  return (
    <svg
      width={361}
      height={480}
      viewBox="0 0 361 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={twMerge("flex w-full", className)}
    >
      <g clipPath="url(#clip0_2746_84726)">
        <g clipPath="url(#clip1_2746_84726)">
          <g filter="url(#filter0_d_2746_84726)">
            <rect
              width={361}
              height={310}
              fill="url(#pattern0_2746_84726)"
              shapeRendering="crispEdges"
            />
          </g>
          <rect
            width={360}
            height={170}
            transform="translate(0 310)"
            fill="#282B28"
          />
          <rect
            width={360}
            height={170}
            transform="translate(0 310)"
            fill="url(#pattern1_2746_84726)"
            style={{
              mixBlendMode: "luminosity",
            }}
          />
        </g>
      </g>
      <path
        d="M1 16C1 7.71574 7.71573 1 16 1H345C353.284 1 360 7.71573 360 16V464C360 472.284 353.284 479 345 479H16C7.71574 479 1 472.284 1 464V16Z"
        stroke="#ECECEC"
        strokeWidth={2}
      />
      <defs>
        <filter
          id="filter0_d_2746_84726"
          x={-15}
          y={-7}
          width={391}
          height={340}
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
            result="effect1_dropShadow_2746_84726"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2746_84726"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_2746_84726"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref={`#image0_${img0}`}
            transform="matrix(0.000403226 0 0 0.000469563 0 -0.198235)"
          />
        </pattern>
        <pattern
          id="pattern1_2746_84726"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#image1_2746_84726"
            transform="matrix(0.00025 0 0 0.000529412 0 -1.20588)"
          />
        </pattern>
        <clipPath id="clip0_2746_84726">
          <path
            d="M0 16C0 7.16346 7.16344 0 16 0H345C353.837 0 361 7.16344 361 16V464C361 472.837 353.837 480 345 480H16C7.16345 480 0 472.837 0 464V16Z"
            fill="white"
          />
        </clipPath>
        <clipPath id="clip1_2746_84726">
          <rect width={361} height={480} rx={16} fill="white" />
        </clipPath>
        <image
          preserveAspectRatio="xMidYMid slice"
          xlinkHref={imageUrl}
          id={`image0_${img0}`}
          width={2480}
          height={3508}
        />
        {/* compress the base image */}
        <image
          xlinkHref={"/vinyl-physical-bg.png"}
          id="image1_2746_84726"
          width={4000}
          height={4000}
        />
      </defs>
    </svg>
  );
}
