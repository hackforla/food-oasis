import React, { useState } from "react";
import * as esriService from "../services/esri_service";
import { TextField, Typography, Button } from "@material-ui/core";

const LocationAutocomplete = props => {
  const [searchString, setSearchString] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({});
  const [geocodeResults, setGeocodeResults] = useState([]);

  const geocode = async evt => {
    const s = evt.target.value;
    setSearchString(s);
    const result = await esriService.geocode(s);
    setGeocodeResults(result);
  };

  const selectLocation = location => {
    setSelectedLocation(location);
    setGeocodeResults([]);
    props.setLocation(location);
  };

  return (
    <div>
      <TextField
        name="searchString"
        value={searchString}
        onChange={geocode}
        placeholder={"Type here"}
      />
      {geocodeResults ? (
        geocodeResults.map((result, index) => (
          <div
            style={{
              border: "1px solid black",
              backgroundColor: "#EEE",
              margin: "0.1em",
              padding: "0.5em"
            }}
            key={index}
          >
            <Typography>{`(${result.location.y}, ${result.location.x})`}</Typography>
            <Typography>{`${result.attributes.Match_addr}`}</Typography>
            <Typography>{`${result.attributes.Addr_type}`}</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => selectLocation(result)}
            >
              Choose
            </Button>
          </div>
        ))
      ) : (
        <div>No Results</div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
