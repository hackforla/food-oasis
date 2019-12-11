import React from "react";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import hackForLA from "../images/hackforla.svg";
import codeForAmerica from "../images/codeforamerica.svg";

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  }
});

const Donate = () => {
  const { t } = useTranslation("donate");
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <h2>{t("title")}</h2>
      <Grid container justify="space-around" alignItems="center">
        <Grid item>
          <img src={hackForLA} alt="Hack for LA logo" />
        </Grid>
        <Grid item>
          <img src={codeForAmerica} alt="Code for America logo" />
        </Grid>
      </Grid>
      <h2>{t("support")}</h2>
      <p>{t("support-p")}</p>
      <Button variant="outlined">{t("donate")}</Button>
      <h2>{t("subscribe")}</h2>
      <p>{t("subscribe-text")}</p>
      <Button variant="outlined">{t("subscribe-button")}</Button>
      <h2>{t("questions")}</h2>
      <p>{t("questions-text")}</p>
      <Button variant="outlined">{t("send-a-message")}</Button>
    </Container>
  );
};

export default Donate;
