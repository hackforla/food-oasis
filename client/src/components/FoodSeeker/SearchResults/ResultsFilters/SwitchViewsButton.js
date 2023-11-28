import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MapIcon from "@mui/icons-material/Map";
import { Button, Typography, styled } from "@mui/material";

// Override standard button hover behavior
const SwitchButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    color: "inherit",
    backgroundColor: "inherit",
  },
}));

export default function SwitchViewsButton({ isListView, onClick, style }) {
  return (
    <SwitchButton onClick={onClick} sx={style}>
      {!isListView && (
        <>
          <FormatListBulletedIcon />
          <Typography variant="button" color="inherit">
            List
          </Typography>
        </>
      )}
      {isListView && (
        <>
          <MapIcon />
          <Typography variant="button" color="inherit">
            Map
          </Typography>
        </>
      )}
    </SwitchButton>
  );
}
