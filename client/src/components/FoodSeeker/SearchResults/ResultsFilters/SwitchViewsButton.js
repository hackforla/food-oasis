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
    <SwitchButton
    sx={{
      maxWidth: '48px'
    }}
     onClick={onClick}>
      {!isListView && (
        <>
          <Typography
          sx={{
            fontSize: '16px',
            textTransform: 'capitalize',
            fontWeight: '500'
          }}
          color="inherit">List</Typography>
        </>
      )}
      {isListView && (
        <>
          <Typography
          sx={{
            fontSize: '16px',
            textTransform: 'capitalize',
            fontWeight: '500'
          }}
           color="inherit">Map</Typography>
        </>
      )}
    </SwitchButton>
  );
}
