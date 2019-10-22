import React from "react";
import { Card, List } from "@material-ui/core";
import StakeholderListItem from "./StakeholderListItem";

const StakeholderList = props => {
  const { stakeholders } = props;
  return (
    <Card>
      <List>
        {stakeholders.map(stakeholder => {
          return (
            <StakeholderListItem
              stakeholder={stakeholder}
              key={stakeholder.id}
            />
          );
        })}
      </List>
    </Card>
  );
};

export default StakeholderList;
