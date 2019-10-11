import React from "react";
import * as stakeholderService from "../services/stakeholder-service";

class Stakeholders extends React.Component {
  state = {
    stakeholders: []
  };
  async componentDidMount() {
    const stakeholders = await stakeholderService.search({
      categoryIds: [2, 3]
    });
    this.setState({ stakeholders });
  }

  render() {
    const { stakeholders } = this.state;
    return (
      <React.Fragment>
        <h2>Stakeholders</h2>
        {stakeholders.map(stakeholder => {
          return (
            <div
              style={{
                border: "1px solid black",
                margin: "4px",
                padding: "4px"
              }}
            >
              <h4 style={{ margin: "0" }}>{stakeholder.name}</h4>
              {stakeholder.website ? (
                <div>
                  <a href={stakeholder.website}>website</a>
                </div>
              ) : null}
              <div>{stakeholder.address1}</div>
              {stakeholder.address2 ? <div>{stakeholder.address2}</div> : null}
              <div>
                {stakeholder.city}, {stakeholder.state} {stakeholder.zip}
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
export default Stakeholders;
