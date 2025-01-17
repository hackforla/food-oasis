import { AppBar, Alert, Box, Toolbar, Typography } from "@mui/material";
import useLocationHook from "hooks/useLocationHook";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useUserContext } from "contexts/userContext";
import { TENANT_LOGO_URL } from "helpers/Constants";
import Menu from "./Menu";

Header.propTypes = {
  tenantId: PropTypes.number,
};

export default function Header() {
  const { isAuthPage, isMapPage } = useLocationHook();
  const imageType = TENANT_LOGO_URL
    ? TENANT_LOGO_URL.split(".").pop()
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
              maxWidth: "175px",
              maxHeight: "48px",
              margin: "4px 4px 0 4px",
              [theme.breakpoints.down("sm")]: {
                maxHeight: "36px",
                margin: "4px 4px 0 8px",
              },
            })}
          >
            <a href="/">
              <img
                src={TENANT_LOGO_URL}
                style={
                  imageType === "svg" ? { width: "100%", height: "100%" } : {}
                }
                alt="logo"
              />
            </a>
          </Box>
          {isMapPage ? (
            <Alert severity="warning">
              Due to the LA Fires (Jan 2025), some information may be
              out-of-date.
            </Alert>
          ) : null}
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
                <Link to={`/admin/profile/${user.id}`}>
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
