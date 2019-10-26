import React from "react";
import { Grid, Typography, Card, CardContent, Button } from "@material-ui/core";

const StakeholderListItem = props => {
  const { stakeholder } = props;
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3} key={stakeholder.id}>
      <Card style={{ height: "100%" }}>
        <CardContent>
          <Typography variant={"h5"} component={"h2"}>
            {stakeholder.name}
          </Typography>
          <Typography variant={"caption"} component={"p"}>
            {stakeholder.categories.map(cat => cat.name).join(", ")}
          </Typography>

          {stakeholder.website ? (
            <div>
              <Button href={stakeholder.website} target="_blank">
                website
              </Button>
            </div>
          ) : null}
          <div>{stakeholder.address1}</div>
          {stakeholder.address2 ? <div>{stakeholder.address2}</div> : null}
          <div>
            {stakeholder.city}, {stakeholder.state} {stakeholder.zip}
          </div>
          {/* <div>
            longitude: {stakeholder.longitude} latitude: {stakeholder.latitude}
          </div> */}
          {stakeholder.distance && (
            <div>distance: {stakeholder.distance.toFixed(2)} mi.</div>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StakeholderListItem;
