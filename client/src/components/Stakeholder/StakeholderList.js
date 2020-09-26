import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import StakeholderListItem from "./StakeholderListItem";

const StakeholderList = (props) => {
  const { stakeholders } = props;
  return (
    <Grid container spacing={2} style={{ padding: "16px" }}>
      {stakeholders &&
        stakeholders.length > 0 &&
        stakeholders.map((stakeholder) => (
          <StakeholderListItem key={stakeholder.id} stakeholder={stakeholder} />
        ))}
      {!stakeholders ||
        (stakeholders.length < 1 && (
          <Grid item>
            <Typography variant={"h5"} component={"h5"}>
              No matches found, please try different Criteria
            </Typography>
          </Grid>
        ))}
      )}
    </Grid>
  );
};

export default withRouter(StakeholderList);
