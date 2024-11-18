"use client";
import React, { useState } from "react";

interface SvgIconProps {
  fillColor: string;
  size?: number;
}

const ApplyToBeCreatorIcon: React.FC<SvgIconProps> = ({
  fillColor,
  size = 20,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1848_27070)">
        <path
          d="M18.5 11V16C18.5 16.5304 18.2893 17.0391 17.9142 17.4142C17.5391 17.7893 17.0304 18 16.5 18H2.5C1.96957 18 1.46086 17.7893 1.08579 17.4142C0.710714 17.0391 0.5 16.5304 0.5 16V2C0.5 1.46957 0.710714 0.960859 1.08579 0.585786C1.46086 0.210714 1.96957 0 2.5 0H7.5V2H2.5V16H16.5V11H18.5Z"
          fill={fillColor}
        />
        <path
          d="M18.5 4H14.5V0H12.5V4H8.5V6H12.5V10H14.5V6H18.5V4Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_1848_27070">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ApplyToBeCreatorIcon;
