import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import useLocationHook from "hooks/useLocationHook";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSiteContext } from "../../contexts/siteContext";
import { useUserContext } from "../../contexts/userContext";
import Menu from "./Menu";

Header.propTypes = {
  tenantId: PropTypes.number,
};

const logoPaths = {
  1: require("images/foodoasis.svg").default,
  2: require("images/foodoasis.svg").default,
  3: require("../StaticPagesHI/assets/aloha-harvest-bg-none.png"),
  4: require("images/foodoasis.svg").default,
  5: require("images/foodoasis.svg").default,
  6: require("images/foodoasis.svg").default,
};

export default function Header() {
  const { tenantId } = useSiteContext();
  const { isAuthPage } = useLocationHook();
  const imageType = logoPaths
    ? logoPaths[tenantId].split(".").pop()
    : "unknown";

  const { user } = useUserContext();

  return (
    <>
      <AppBar
        position="sticky"
        sx={(theme) => ({
          backgroundColor: "#FFF",
          marginBottom: 0,
          boxShadow: "none",
          marginTop: isAuthPage && theme.spacing(4),
        })}
      >
        <Toolbar
          sx={(theme) => ({
            minHeight: "60px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5em",
            [theme.breakpoints.down("md")]: {
              padding: "0 0.5em 0 0",
              minHeight: "45px",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              "maxWidth": "175px",
              "maxHeight": "48px",
              "margin": "4px 4px 0 4px",
              "&:hover": {
                filter: "brightness(1.2)",
              },
              [theme.breakpoints.down("sm")]: {
                maxHeight: "36px",
                margin: "4px 4px 0 8px",
              },
            })}
          >
            <a href="/">
              <img
                src={logoPaths[tenantId]}
                style={
                  imageType === "svg" ? { width: "100%", height: "100%" } : {}
                }
                alt="logo"
              />
            </a>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexGrow: 2,
              justifyContent: "space-between",
              alignItems: "center",
              margin: "0px 24px",
            }}
          >
            {user && user.firstName && (
              <Typography
                variant="subtitle1"
                sx={(theme) => ({
                  color: theme.palette.primary.dark,
                  display: "inline-block",
                  fontStyle: "italic",
                  lineHeight: "1.5",
                  flexGrow: 1,
                  fontFamily: `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
                                  Helvetica, Arial, "Lucida Grande", sans- serif`,
                })}
                align="right"
              >
                <Link to={`/profile/${user.id}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </Typography>
            )}
          </Box>
          <Menu />
        </Toolbar>
      </AppBar>
    </>
  );
}
