import React, { useState } from "react";
import * as esriService from "../../services/esri_service";
import { Grid, Typography } from "@material-ui/core";
import Controls from '../UI';

let latestSearchString = "";

const LocationAutocomplete = (props) => {
  const [searchString, setSearchString] = useState("");
  const [geocodeResults, setGeocodeResults] = useState([]);

  const geocode = async (evt) => {
    const s = evt.target.value;
    latestSearchString = s;
    setSearchString(s);

    setTimeout(async () => {
      // If the geocode fn gets called again, before
      // this request starts executing after the
      // setTimeout delay, this request is stale
      // and we don't want to run it.
      if (s.length > 8 && s === latestSearchString) {
        const result = await esriService.geocode(s);
        setGeocodeResults(result);
      }
    }, 500);
  };

  const selectLocation = (location) => {
    setGeocodeResults([]);
    props.setLocation(location);
  };

  return (
    <div>
      <Controls.Input 
        name="searchString"
        variant="outlined"
        value={searchString}
        onChange={geocode}
        fullWidth
        size="small"
        placeholder={"Type here"}      
      />
      {geocodeResults ? (
        geocodeResults.map((result, index) => (
          <div
            style={{
              border: "1px solid black",
              backgroundColor: "#EEE",
              margin: "0.1em",
              padding: "0.5em",
            }}
            key={index}
            onClick={() => selectLocation(result)}
          >
            <Typography>{`(${result.location.y}, ${result.location.x})`}</Typography>
            <Typography>{`${result.attributes.PlaceName}`}</Typography>
            <Typography>{`${result.attributes.StAddr}`}</Typography>
            <Grid container justify="space-between">
              <Typography>
                {`${result.attributes.City}, ${result.attributes.RegionAbbr} `}
              </Typography>
              <Typography>{`${result.attributes.Addr_type}`}</Typography>
            </Grid>
          </div>
        ))
      ) : (
        <div>No Results</div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
