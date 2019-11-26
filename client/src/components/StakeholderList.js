import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import StakeholderListItem from "./StakeholderListItem";

const StakeholderList = props => {
  const { stakeholders } = props;
  return (
    <Grid
      container
      spacing={2}
      style={{ padding: "16px" }}
      alignItems={"stretch"}
    >
      {stakeholders && stakeholders.length > 0 ? (
        stakeholders.map(stakeholder => {
          return (
            <StakeholderListItem
              stakeholder={stakeholder}
              key={stakeholder.id}
            />
          );
        })
      ) : (
        <Grid item>
          <Typography variant={"h5"} component={"h5"}>
            No matches found, please try different Criteria
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default withRouter(StakeholderList);
