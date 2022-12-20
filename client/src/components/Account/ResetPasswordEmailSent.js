import { Avatar, Container, CssBaseline, Typography } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import { withRouter } from "react-router-dom";
import { Button } from "../../components/UI";
import Footer from "../Layout/Footer";

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
        stroke-linecap="round"
      />
      <path
        d="M8.8 5.7666H1M8.8 10.0999H4.03333"
        stroke="white"
        stroke-linecap="round"
      />
    </svg>
  );
};

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  header: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(3, 0, 3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  body: {
    display: "flex",
    height: "97.8%",
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
});

const ResetPasswordEmailSent = (props) => {
  const { classes, history, match } = props;

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="s" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MailIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            className={classes.header}
            align="center"
          >
            Password Reset Link was Sent
          </Typography>
          <Typography component="p" align="center">
            A password reset link was sent to {match.params.email}.<br /> If you
            don’t see it in your inbox, please check your junk/spam folder.
          </Typography>
          <Container maxWidth="xs">
            <Button
              fullWidth
              className={classes.button}
              onClick={() => history.push("/login")}
            >
              Back to login
            </Button>
          </Container>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withStyles(styles)(withRouter(ResetPasswordEmailSent));
