import React from "react";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import hackForLA from "../images/hackforla.svg";
import codeForAmerica from "../images/codeforamerica.svg";
import { Button } from '../../components/UI';

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "2rem",
  },
  image: {
    margin: "1rem",
  },
  sectionHeader: {
    marginTop: "3rem",
  },
  description: {
    margin: "1rem 0",
  },
});

const Donate = () => {
  const { t } = useTranslation("donate");
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h6">{t("title")}</Typography>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item className={classes.image}>
          <img src={hackForLA} alt="Hack for LA logo" />
        </Grid>
        <Grid item className={classes.image}>
          <img src={codeForAmerica} alt="Code for America logo" />
        </Grid>
      </Grid>
      <Typography className={classes.sectionHeader} align="center" variant="h4">
        {t("support")}
      </Typography>
      <Typography className={classes.description} component={`p`}>
        {t("support-p")}
      </Typography>
      <Button variant='outlined'>
        {t('donate')}
      </Button>
      <Typography className={classes.sectionHeader} align="center" variant="h4">
        {t("subscribe")}
      </Typography>
      <Typography className={classes.description} component={`p`}>
        {t("subscribe-text")}
      </Typography>
      <Button variant='outlined'>
        {t('subscribe-button')}
      </Button>
      <Typography className={classes.sectionHeader} align="center" variant="h4">
        {t("questions")}
      </Typography>
      <Typography className={classes.description} component={`p`}>
        {t("questions-text")}
      </Typography>
      <Button variant='outlined'>
        {t('send-a-message')}
      </Button>
    </Container>
  );
};

export default Donate;
