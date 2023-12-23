import { AppBar, Toolbar } from "@mui/material";
import Menu from "./Menu";

export default function Header() {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "transparent",
          mb: "-65px",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={(theme) => ({
            display: "flex",
            justifyContent: "flex-end",
            "&.MuiToolbar-root": {
              minHeight: "60px",
              padding: "0.25em 1.25em 0 0",
              [theme.breakpoints.down("sm")]: {
                minHeight: "45px",
                padding: "0.25em 0.5em 0 0",
              },
            },
          })}
        >
          <Menu />
        </Toolbar>
      </AppBar>
    </>
  );
}
