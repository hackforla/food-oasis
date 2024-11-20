import * as React from "react";
import { foodPantry, white } from "theme/palette";

function PantryIconNoBorder({
  height = "72px",
  width = "72px",
  selected = false,
  ...props
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 16"
      fill="none"
      {...props}
    >
      <path
        d="M0 5.774C0 8.964 6 16 6 16s6-7.036 6-10.226C12 2.585 9.314 0 6 0S0 2.585 0 5.774z"
        fill={selected ? white : foodPantry}
      />
      <path
        d="M6 9.69c-.219.199-.645.31-1.012.31C3.728 10 2 8.177 2 6.553s.82-2.776 2.081-2.776c.684 0 1.236.068 1.53.353l-.005-.018s-.227-.794-.6-.96c.206-.09.587-.341.587-.341s.586.65.586 1.302v.017c.433-.311.951-.503 1.74-.503C9.178 3.627 10 4.929 10 6.553S8.211 10 6.95 10c-.37 0-.73-.108-.95-.31z"
        fill={selected ? foodPantry : white}
      />
      <path
        d="M7.572 3.049c-.336.452-1.075.588-1.075.588s-.194-.597.142-1.049C6.975 2.137 7.714 2 7.714 2s.194.597-.142 1.049z"
        fill={selected ? foodPantry : white}
      />
    </svg>
  );
}

const MemoPantryIconNoBorder = React.memo(PantryIconNoBorder);
export default MemoPantryIconNoBorder;
