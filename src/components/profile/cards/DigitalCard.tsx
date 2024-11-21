import React from "react";

function DigitalCard({
  imageUrl,
  className,
}: {
  imageUrl: string;
  className?: string;
}) {
  const img0 = Math.random() * 1000;
  return (
    <svg
      xmlns={`http://www.w3.org/2000/svg`}
      xmlnsXlink={`http://www.w3.org/1999/xlink`}
      width={`173`}
      height={`240`}
      fill={`none`}
      viewBox={`0 0 173 240`}
      className={className}
    >
      <g clipPath={`url(#clip0_${img0})`}>
        <g filter={`url(#filter0_d_${img0})`}>
          <path
            fill={`url(#pattern0_${img0})`}
            d={`M0 0h173v240H0z`}
            shapeRendering={`crispEdges`}
          ></path>
        </g>
        <path
          fill={`url(#paint0_linear_${img0})`}
          d={`M0 0h173v62H0z`}
          transform={`translate(0 178)`}
        ></path>
      </g>
      <mask id={`path-4-inside-1_${img0}}`} fill={`#fff`}>
        <path
          fillRule={`evenodd`}
          d={`M0 8v224h1.917v4h1.917v2h3.834v2h157.664v-2h3.834v-2h1.917v-4H173V8h-1.917V4h-1.917V2h-3.834V0H7.668v2H3.834v2H1.917v4z`}
          clipRule={`evenodd`}
        ></path>
      </mask>
      <path
        fill={`#ECECEC`}
        d={`M0 8V6h-2v2zm0 224h-2v2h2zm1.917 0h2v-2h-2zm0 4h-2v2h2zm1.917 0h2v-2h-2zm0 2h-2v2h2zm3.834 0h2v-2h-2zm0 2h-2v2h2zm157.664 0v2h2v-2zm0-2v-2h-2v2zm3.834 0v2h2v-2zm0-2v-2h-2v2zm1.917 0v2h2v-2zm0-4v-2h-2v2zm1.917 0v2h2v-2zm0-224h2V6h-2zm-1.917 0h-2v2h2zm0-4h2V2h-2zm-1.917 0h-2v2h2zm0-2h2V0h-2zm-3.834 0h-2v2h2zm0-2h2v-2h-2zM7.668 0v-2h-2v2zm0 2v2h2V2zM3.834 2V0h-2v2zm0 2v2h2V4zM1.917 4V2h-2v2zm0 4v2h2V8zM-2 8v224h4V8zm2 226h1.917v-4H0zm-.083-2v4h4v-4zm2 6h1.917v-4H1.917zm-.083-2v2h4v-2zm2 4h3.834v-4H3.834zm1.834-2v2h4v-2zm2 4h157.664v-4H7.668zm159.664-2v-2h-4v2zm-2 0h3.834v-4h-3.834zm5.834-2v-2h-4v2zm-2 0h1.917v-4h-1.917zm3.917-2v-4h-4v4zm-2-2H173v-4h-1.917zm3.917-2V8h-4v224zM173 6h-1.917v4H173zm.083 2V4h-4v4zm-2-6h-1.917v4h1.917zm.083 2V2h-4v2zm-2-4h-3.834v4h3.834zm-1.834 2V0h-4v2zm-2-4H7.668v4h157.664zM5.668 0v2h4V0zm2 0H3.834v4h3.834zM1.834 2v2h4V2zm2 0H1.917v4h1.917zM-.083 4v4h4V4zm2 2H0v4h1.917z`}
        mask={`url(#path-4-inside-1_${img0})`}
      ></path>
      <defs>
        <linearGradient
          id={`paint0_linear_${img0}`}
          x1={`87`}
          x2={`86.433`}
          y1={`0`}
          y2={`61.999`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopOpacity={`0`}></stop>
          <stop offset={`1`}></stop>
        </linearGradient>
        <clipPath id={`clip0_${img0}`}>
          <rect width={`173`} height={`240`} fill={`#fff`} rx={`16`}></rect>
        </clipPath>
        <pattern
          id={`pattern0_${img0}`}
          width={`1`}
          height={`1`}
          patternContentUnits={`objectBoundingBox`}
        >
          <use
            xlinkHref={`#image0_${img0}`}
            transform={`matrix(.00192 0 0 .00139 0 -.012)`}
          ></use>
        </pattern>
        <filter
          id={`filter0_d_${img0}`}
          width={`203`}
          height={`270`}
          x={`-15`}
          y={`-7`}
          colorInterpolationFilters={`sRGB`}
          filterUnits={`userSpaceOnUse`}
        >
          <feFlood floodOpacity={`0`} result={`BackgroundImageFix`}></feFlood>
          <feColorMatrix
            in={`SourceAlpha`}
            result={`hardAlpha`}
            values={`0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0`}
          ></feColorMatrix>
          <feOffset dy={`8`}></feOffset>
          <feGaussianBlur stdDeviation={`7.5`}></feGaussianBlur>
          <feComposite in2={`hardAlpha`} operator={`out`}></feComposite>
          <feColorMatrix
            values={`0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0`}
          ></feColorMatrix>
          <feBlend
            in2={`BackgroundImageFix`}
            result={`effect1_dropShadow_${img0}`}
          ></feBlend>
          <feBlend
            in={`SourceGraphic`}
            in2={`effect1_dropShadow_${img0}`}
            result={`shape`}
          ></feBlend>
        </filter>
        {img0 && (
          <image
            xlinkHref={imageUrl}
            id={`image0_${img0}`}
            width={`520`}
            height={`738`}
            preserveAspectRatio="xMidYMid slice"
          ></image>
        )}
      </defs>
    </svg>
  );
}

export default DigitalCard;
