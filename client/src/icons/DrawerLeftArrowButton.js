function DrawerLeftArrowButton() {
  return (
    <svg
      width="46"
      height="100"
      viewBox="0 0 76 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_5719_24249)">
        <path
          d="M20 16H46C51.5228 16 56 20.4772 56 26V98C56 103.523 51.5228 108 46 108H20V16Z"
          fill="white"
        />
      </g>
      <path
        d="M42 54L34.703 61.3838C34.3147 61.7766 34.3185 62.4098 34.7114 62.798L42 70"
        stroke="#313233"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <filter
          id="filter0_d_5719_24249"
          x="0"
          y="0"
          width="76"
          height="132"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.0861762 0 0 0 0 0.39171 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5719_24249"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5719_24249"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default DrawerLeftArrowButton;
