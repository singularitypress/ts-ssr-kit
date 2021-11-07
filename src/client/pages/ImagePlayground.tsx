import React from "react";

const Svg1 = () => {
  return (
    <svg width="1920" height="1380" viewBox="0 0 1920 1380" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <rect width="1920" height="1379" transform="translate(0 0.5)" fill="#1040C1" />
        <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1378">
          <rect y="0.5" width="1920" height="1377" fill="#38AF88" />
        </mask>
        <g mask="url(#mask0)">
          <rect opacity="0.5" width="915.857" height="1623.41" transform="matrix(0.970524 0.241004 -0.438762 0.898603 1422.9 -79.2495)" fill="#1072EB" />
          <rect opacity="0.5" width="1103.73" height="2258.79" transform="matrix(0.0750469 -0.99718 0.997737 0.067235 -338 1307.5)" fill="#1040C1" />
          <rect opacity="0.5" width="900.752" height="1693.94" transform="matrix(0.970524 0.241004 -0.438762 0.898603 0.238281 -240.688)" fill="#142C8E" />
          <rect opacity="0.5" width="351.272" height="2301" transform="matrix(0.0432526 -0.999064 0.998507 0.0546328 -25 151.285)" fill="#1040C1" />
        </g>
        <mask id="mask1" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1378">
          <rect y="0.5" width="1920" height="1377" fill="#38AF88" />
        </mask>
        <g mask="url(#mask1)">
          <rect opacity="0.5" width="915.857" height="1623.41" transform="matrix(0.970524 0.241004 -0.438762 0.898603 1422.9 -79.2495)" fill="#1072EB" />
          <rect opacity="0.5" width="1103.73" height="2258.79" transform="matrix(0.0750469 -0.99718 0.997737 0.067235 -338 1307.5)" fill="#1040C1" />
          <rect opacity="0.5" width="900.752" height="1693.94" transform="matrix(0.970524 0.241004 -0.438762 0.898603 0.238281 -240.688)" fill="#142C8E" />
          <rect opacity="0.5" width="351.272" height="2301" transform="matrix(0.0432526 -0.999064 0.998507 0.0546328 -25 151.285)" fill="#1040C1" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="1920" height="1379" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ImagePlayground = {
  // title: "Image Playground",
  path: "/img",
  component: () => {
    return (
      <div className="img-container">
        <Svg1 />
      </div>
    );
  },
};
