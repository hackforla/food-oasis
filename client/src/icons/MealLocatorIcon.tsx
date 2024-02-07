import * as React from "react";

function MealLocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 16" fill="none" {...props}>
      <path
        d="M0 5.774C0 8.964 6 16 6 16s6-7.036 6-10.226C12 2.585 9.314 0 6 0S0 2.585 0 5.774z"
        fill="#EF7F4F"
      />
      <path
        d="M7.637 2.415c.304 0 .363.318.363.318v2.976c0 .922-1.088 1.136-1.088 1.136l.009 2.976s-.01.594-.73.594h-.367c-.7 0-.713-.594-.713-.594L5.1 6.845S4 6.637 4 5.712V2.72s.009-.304.363-.304c.355 0 .36.01.36.304 0 .293.012 2.147.012 2.147s.025.283.19.283.152-.283.152-.283V2.719c0-.304.004-.304.367-.304s.38.01.38.304v2.178s.013.273.177.273c.164 0 .18-.293.18-.293V2.712c0-.297.064-.297.394-.297s.35.018.35.29V4.84s-.013.34.165.34c.183 0 .194-.32.194-.32l.003-2.134c0-.311.046-.311.35-.311z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoMealLocationIcon = React.memo(MealLocationIcon);
export default MemoMealLocationIcon;
