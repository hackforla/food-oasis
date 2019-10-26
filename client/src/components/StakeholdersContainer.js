import React from "react";

import * as stakeholderService from "../services/stakeholder-service";
import * as categoryService from "../services/category-service";
import { Typography } from "@material-ui/core";
import StakeholderSearch from "./StakeholderSearch";
import StakeholderCriteria from "./StakeholderCriteria";
import StakeholderList from "./StakeholderList";

class StakeholdersContainer extends React.Component {
  state = {
    stakeholders: [],
    categories: [],
    searchString: "",
    selectedCategories: [{ id: 1, name: "Food Pantry" }],
    selectedLatitude: 34.041001,
    selectedLongitude: -118.235036,
    selectedDistance: 20,
    searchPanelOpen: false,
    isLoading: true
  };

  async componentDidMount() {
    // The fact that the geolocation api only uses callbacks makes
    // this function convoluted - need to work on cleaning this up
    // somehow. If user agent (browser) does not support geolocation
    // of machine, or user disables location, we currently use the
    // lat, lon of LACI as the current location. Need to work on
    // allowing user to enter a street address of their choosing.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            categoryService.getAll().then(categories => {
              const selectedCategories = categories.filter(cat => cat.id === 1);
              this.setState(
                {
                  selectedLatitude: latitude,
                  selectedLongitude: longitude,
                  categories,
                  selectedCategories
                },
                this.searchState
              );
            });
          }
        },
        err => {
          console.log(err);
          categoryService.getAll().then(categories => {
            const selectedCategories = categories.filter(cat => cat.id === 1);
            this.setState(
              {
                categories,
                selectedCategories
              },
              this.searchState
            );
          });
        }
      );
    } else {
      const categories = await categoryService.getAll();
      const selectedCategories = categories.filter(cat => cat.id === 1);

      this.setState(
        {
          categories,
          selectedCategories
        },
        this.searchState
      );
    }
  }

  openSearchPanel = open => {
    this.setState({ searchPanelOpen: open });
  };

  searchState = () => {
    const {
      searchString: name,
      selectedCategories,
      selectedLatitude: latitude,
      selectedLongitude: longitude,
      selectedDistance
    } = this.state;
    stakeholderService
      .search({
        name,
        categoryIds: selectedCategories.map(category => category.id),
        latitude,
        longitude,
        selectedDistance
      })
      .then(stakeholders => {
        this.setState({
          stakeholders,
          searchPanelOpen: false,
          isLoading: false
        });
      });
  };

  search = (
    searchString,
    latitude,
    longitude,
    selectedCategories,
    selectedDistance
  ) => {
    if (!selectedCategories) return;
    stakeholderService
      .search({
        name: searchString,
        categoryIds: selectedCategories.map(category => category.id),
        latitude,
        longitude,
        selectedDistance
      })
      .then(stakeholders => {
        this.setState({
          stakeholders,
          searchString,
          selectedCategories,
          selectedLatitude: latitude,
          selectedLongitude: longitude,
          selectedDistance,
          searchPanelOpen: false,
          isLoading: false
        });
      });
  };

  render() {
    const {
      stakeholders,
      categories,
      searchString,
      selectedLongitude,
      selectedLatitude,
      selectedDistance,
      selectedCategories,
      searchPanelOpen,
      isLoading
    } = this.state;
    return (
      <React.Fragment>
        <Typography variant={"h4"} component={"h1"} align="center">
          Stakeholders{" "}
        </Typography>
        {searchPanelOpen ? (
          <StakeholderSearch
            key={selectedLatitude}
            latitude={selectedLatitude}
            longitude={selectedLongitude}
            categories={categories}
            searchString={searchString}
            selectedCategories={selectedCategories}
            selectedDistance={selectedDistance}
            search={this.search}
          />
        ) : (
          <StakeholderCriteria
            key={selectedLatitude}
            latitude={selectedLatitude}
            longitude={selectedLongitude}
            searchString={searchString}
            selectedCategories={selectedCategories}
            selectedDistance={selectedDistance}
            openSearchPanel={this.openSearchPanel}
          />
        )}
        {isLoading ? null : <StakeholderList stakeholders={stakeholders} />}
      </React.Fragment>
    );
  }
}
export default StakeholdersContainer;
