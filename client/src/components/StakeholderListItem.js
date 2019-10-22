import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

const styles = {
  listItem: {
    backgroundColor: "#FAEBD7",
    margin: "10px"
  }
};

const StakeholderListItem = props => {
  const { stakeholder } = props;
  return (
    <ListItem style={styles.listItem} key={stakeholder.id}>
      <ListItemText primary={stakeholder.name}></ListItemText>
      <div>
        {
          <React.Fragment>
            {stakeholder.website ? (
              <div>
                <a
                  href={"http://" + stakeholder.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  website
                </a>
              </div>
            ) : null}
            <div>{stakeholder.address1}</div>
            {stakeholder.address2 ? <div>{stakeholder.address2}</div> : null}
            <div>
              {stakeholder.city}, {stakeholder.state} {stakeholder.zip}
            </div>
            <div>
              longitude: {stakeholder.longitude} latitude:{" "}
              {stakeholder.latitude}
            </div>
            {stakeholder.distance && (
              <div>distance: {stakeholder.distance.toFixed(2)} mi.</div>
            )}
          </React.Fragment>
        }
        />
      </div>
    </ListItem>
  );
};

export default StakeholderListItem;
