import React from "react";
import Menu from "./Menu";
import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <>
      <AppBar position="sticky"
              sx={{
                backgroundColor: 'transparent',
                mb:'-65px',
                boxShadow: 'none'
                }}>
          <Toolbar sx={(theme) => ({
                      display: 'flex',
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
