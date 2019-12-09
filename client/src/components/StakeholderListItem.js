import React from "react";
import { Grid, Typography, Card, CardContent, Link } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { UserContext } from "./user-context";
import EditButton from "./EditButton";
import { withRouter } from "react-router-dom";
import moment from "moment";

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
              <Link href={stakeholder.website} target="_blank">
                {stakeholder.website}
              </Link>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              justifyItems: "center"
            }}
          >
            {stakeholder.verifiedDate ? (
              <div>
                <Check />
                <Typography
                  variant={"caption"}
                  component={"p"}
                  display={"inline"}
                >
                  {" " + moment(stakeholder.verifiedDate).format("MM/DD/YY")}
                </Typography>
              </div>
            ) : (
              <span></span>
            )}
            <UserContext.Consumer>
              {user =>
                user && user.isAdmin ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <EditButton
                      label="Edit"
                      href={`/stakeholderedit/${stakeholder.id}`}
                    />
                  </div>
                ) : null
              }
            </UserContext.Consumer>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default withRouter(StakeholderListItem);
