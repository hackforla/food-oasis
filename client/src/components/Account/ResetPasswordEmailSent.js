import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Avatar, Box, Container, CssBaseline, Typography } from "@mui/material";
import { palette } from "theme/palette";

const MailIcon = () => {
  return (
    <svg
      width="27"
      height="15"
      viewBox="0 0 27 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.63424 14H23.7009C24.8055 14 25.7009 13.1046 25.7009 12V3C25.7009 1.89543 24.8055 1 23.7009 1H7.39551C6.90286 1 6.70713 1.63726 7.11484 1.9138L14.8251 7.14337C15.146 7.36102 15.5638 7.37355 15.8971 7.17552L24.8342 1.86667"
        stroke="white"
        strokeLinecap="round"
      />
      <path
        d="M8.8 5.7666H1M8.8 10.0999H4.03333"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  );
};


const ResetPasswordEmailSent = (props) => {
  const { classes} = props;
  const navigate = useNavigate();
  const { email } = useParams();

  return (
    <Container component="main" maxWidth="xs"
    sx={{
      display: "flex",
      height: "97.8%",
      flexDirection: "column",
    }}
    >
        <CssBaseline />
        <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        >
         <Avatar
          sx={{
            margin: "8px",
            backgroundColor: palette.secondary.main,
          }}
          >
            <MailIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              width: "100%", 
              margin: "24px 0px"
            }}
            align="center"
          >
            Password Reset Link was Sent
          </Typography>
          <Typography component="p" align="center">
            A password reset link was sent to {email}.<br /> If you
            don’t see it in your inbox, please check your junk/spam folder.
          </Typography>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Back to login
            </Button>
          </Box>
        </Box>
      </Container>
  );
};


export default ResetPasswordEmailSent;

