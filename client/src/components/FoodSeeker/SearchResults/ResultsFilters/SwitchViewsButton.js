import { Button, Typography, styled } from "@mui/material";

// Override standard button hover behavior
const SwitchButton = styled(Button)(({ theme }) => ({
  background: 'white',
  color: 'black',
  border: '#D5D5D6 solid 1px',
  borderRadius: '10px',
  boxShadow: 'none',
  width: '48px',
  height: '40px',
  minWidth: '0px',
  "&:hover": {
    color: "inherit",
    backgroundColor: "white",
    boxShadow: 'none'
  },
}));


export default function SwitchViewsButton({ isListView, onClick }) {
  return (
    <SwitchButton onClick={onClick}>
      {!isListView && (
        <>
          <Typography
            sx={{
              fontSize: "16px",
              textTransform: "capitalize",
              fontWeight: "500",
            }}
            color="inherit"
          >
            List
          </Typography>
        </>
      )}
      {isListView && (
        <>
          <Typography
            sx={{
              fontSize: "16px",
              textTransform: "capitalize",
              fontWeight: "500",
            }}
            color="inherit"
          >
            Map
          </Typography>
        </>
      )}
    </SwitchButton>
  );
}

// Proposed Option 1: we use the existing button palette, we can removes styled dependency to simplify the component
// import { Button, Typography } from "@mui/material";

// export default function SwitchViewsButton({ isListView, onClick }) {
//   return (
//     <Button
//       sx={{
//         border: "#D5D5D6 solid 1px",
//         borderRadius: "10px",
//         boxShadow: "none",
//         width: "48px",
//         height: "40px",
//         minWidth: "0px",
//       }}
//       onClick={onClick}
//     >
//       {!isListView && (
//         <>
//           <Typography
//             sx={{
//               fontSize: "16px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//             }}
//             color="inherit"
//           >
//             List
//           </Typography>
//         </>
//       )}
//       {isListView && (
//         <>
//           <Typography
//             sx={{
//               fontSize: "16px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//             }}
//             color="inherit"
//           >
//             Map
//           </Typography>
//         </>
//       )}
//     </Button>
//   );
// }

// Proposed Option 2: we modify the hover, active, focus state of this toggle button
// Override standard button to keep the background color as white for hover, active, focus states
// import { Button, Typography, styled } from "@mui/material";

// const SwitchButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.common.black,
//   backgroundColor: theme.palette.common.white,
//   border: "#D5D5D6 solid 1px",
//   borderRadius: "10px",
//   boxShadow: "none",
//   width: "48px",
//   height: "40px",
//   minWidth: "0px",
//   "&:hover": {
//     backgroundColor: theme.palette.common.white,
//   },
//   "&:active": {
//     backgroundColor: theme.palette.common.white,
//     boxShadow: "inset 0px 8px 4px rgba(0,0,0,0.24)",
//   },
//   "&:focus": {
//     backgroundColor: theme.palette.common.white,
//     filter: "drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.8))",
//   },
// }));

// export default function SwitchViewsButton({ isListView, onClick }) {
//   return (
//     <SwitchButton onClick={onClick}>
//       {!isListView && (
//         <>
//           <Typography
//             sx={{
//               fontSize: "16px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//             }}
//             color="inherit"
//           >
//             List
//           </Typography>
//         </>
//       )}
//       {isListView && (
//         <>
//           <Typography
//             sx={{
//               fontSize: "16px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//             }}
//             color="inherit"
//           >
//             Map
//           </Typography>
//         </>
//       )}
//     </SwitchButton>
//   );
// }