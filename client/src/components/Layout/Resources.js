import React from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  listItem: {
    margin: "1rem 0",
  },
  subtitle: {
    marginTop: "2rem",
  },
  title: {
    margin: "1rem 0 .5rem 0",
  },
}));

const Resources = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Typography className={classes.title} variant="h4">
        Healthy Food Resources
      </Typography>
      <Typography className={classes.subtitle} variant="h6">
        Non-Profit and Policy Groups
      </Typography>
      <ul>
        <li className={classes.listItem}>
          <a href="http://goodfoodla.org/good-food/day-to-day-steps/">
            Day-to-day steps, Los Angeles Food Policy Council
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="http://policylink.org/">PolicyLink</a>
        </li>
        <li className={classes.listItem}>
          <a href="http://thefoodtrust.org/">The Food Trust</a>
        </li>
        <li className={classes.listItem}>
          <a href="http://www.chc-inc.org/">Community Health Councils</a>
        </li>
        <li className={classes.listItem}>
          <a href="http://www.foodispower.org/food-deserts/">
            Food Deserts, Food Empowerment Project
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="http://www.hungeractionla.org/">Hunger Action Los Angeles</a>
        </li>
      </ul>
      <Typography className={classes.subtitle} variant="h6">
        Government Data Links
      </Typography>
      <ul>
        <li className={classes.listItem}>
          <a href="http://www.ers.usda.gov/data-products/food-access-research-atlas/go-to-the-atlas.aspx">
            Food Access Research Atlas, USDA
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="https://data.lacity.org/">
            DataLA: Information, Insights, and Analysis from the City of Angels
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="https://www.lacity.org/city-government">
            City Government, City of Los Angeles
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="http://publichealth.lacounty.gov/">
            Department of Public Health, Los Angeles County
          </a>
        </li>
      </ul>
      <Typography className={classes.subtitle} variant="h6">
        Education
      </Typography>
      <ul>
        <li className={classes.listItem}>
          <a href="http://healthpolicy.ucla.edu/">
            UCLA Center for Health Policy Research
          </a>
        </li>
      </ul>
      <Typography className={classes.subtitle} variant="h6">
        Other Useful Links
      </Typography>
      <ul>
        <li className={classes.listItem}>
          <a href="https://psmag.com/finding-nutrition-in-the-food-deserts-of-california-e90f7932ae16">
            Finding Nutrition in the Food Deserts of California (Pacific
            Standard)
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="http://civileats.com/2016/05/12/poor-health-in-americas-cities-flint-extend-beyond-the-water/">
            America’s Food Deserts Need Community Solutions, Not Big Box Stores
            (Civil Eats)
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="https://www.emich.edu/mcnair/documents/1_i-got-99-problems-and-nutrition-is-one.pdf">
            Food Deserts, Societal Impacts, and Potential Solutions (PDF)
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="http://thefoodtrust.org/uploads/media_items/grocerygap.original.pdf">
            The Grocery Gap, Who Has Access to Health Food and Why It Matters
            (PolicyLink)
          </a>
        </li>
        <li className={classes.listItem}>
          <a href="https://www.nytimes.com/2012/04/18/health/research/pairing-of-food-deserts-and-obesity-challenged-in-studies.html?_r=0">
            Studies Question the Pairing of Food Deserts and Obesity (The New
            York Times)
          </a>
        </li>
      </ul>
    </Container>
  );
};

export default Resources;
