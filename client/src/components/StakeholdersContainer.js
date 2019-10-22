import React from "react";
import * as stakeholderService from "../services/stakeholder-service";
import * as categoryService from "../services/category-service";
import { Typography } from "@material-ui/core";
import StakeholderSearch from "./StakeholderSearch";
import StakeholderList from "./StakeholderList";

class StakeholdersContainer extends React.Component {
  state = {
    stakeholders: [],
    categories: [],
    searchString: "",
    selectedCategories: [],
    selectedLatitude: null,
    selectedLongitude: null,
    selectedDistance: 100
  };

  async componentDidMount() {
    const categories = await categoryService.getAll();
    this.setState({ categories });

    navigator.geolocation.getCurrentPosition(position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      this.setState({ latitude, longitude });
    });
  }

  search = (
    searchString,
    latitude,
    longitude,
    selectedCategories,
    selectedDistance
  ) => {
    stakeholderService
      .search({
        name: searchString,
        categoryIds: selectedCategories.map(category => category.id),
        latitude,
        longitude,
        distance: selectedDistance
      })
      .then(stakeholders => {
        this.setState({
          stakeholders,
          searchString,
          selectedCategories,
          latitude,
          longitude,
          selectedDistance
        });
      });
  };

  render() {
    const {
      stakeholders,
      categories,
      longitude,
      latitude,
      selectedDistance,
      selectedCategories
    } = this.state;
    return (
      <React.Fragment>
        <Typography>Stakeholders </Typography>
        <StakeholderSearch
          key={latitude}
          latitude={latitude}
          longitude={longitude}
          categories={categories}
          selectedCategories={selectedCategories}
          selectedDistance={selectedDistance}
          search={this.search}
        />
        <StakeholderList stakeholders={stakeholders} />
      </React.Fragment>
    );
  }
}
export default StakeholdersContainer;
