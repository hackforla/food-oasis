import React from "react";
import * as stakeholderService from "../services/stakeholder-service";
import * as categoryService from "../services/category-service";

class Stakeholders extends React.Component {
  state = {
    stakeholders: [],
    categories: [],
    selectedCategories: [2, 3]
  };

  search = async () => {
    const selectedCategories = this.state.selectedCategories;
    const stakeholders = await stakeholderService.search({
      categoryIds: selectedCategories
    });
    this.setState(prevState => {
      stakeholders.forEach(stakeholder => {
        stakeholder.distance =
          Math.sqrt(
            (Math.abs(stakeholder.longitude - prevState.longitude) *
              Math.cos((prevState.latitude / 360) * 2 * Math.PI)) **
              2 +
              Math.abs(stakeholder.latitude - prevState.latitude) ** 2
          ) * 69.097;
      });
      stakeholders.sort((a, b) => a.distance - b.distance);
      return { stakeholders };
    });
  };
  async componentDidMount() {
    const categories = await categoryService.getAll();

    navigator.geolocation.getCurrentPosition(position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      this.setState({ latitude, longitude, categories });
    });
  }

  render() {
    const { stakeholders, longitude, latitude } = this.state;
    return (
      <React.Fragment>
        <h2>Stakeholders</h2>
        {latitude ? (
          <div>
            longitude: {longitude} latitude: {latitude}{" "}
          </div>
        ) : null}
        <button onClick={this.search}>Search</button>
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
                  <a
                    href={stakeholder.website}
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
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
export default Stakeholders;
