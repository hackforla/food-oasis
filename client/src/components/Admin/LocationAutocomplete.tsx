import { Grid, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FC } from "react";
import * as awsService from "../../services/aws-service";
import { TENANT_ID } from "helpers/Constants";

interface GeocodeResult {
  Place: {
    Geometry: {
      Point: [number, number];
    };
    Label: string;
    SubRegion: string;
    Region: string;
  };
}

interface LocationAutocompleteProps {
  setLocation: (location: GeocodeResult["Place"]) => void;
}

let latestSearchString = "";

const LocationAutocomplete: FC<LocationAutocompleteProps> = ({
  setLocation,
}) => {
  const [searchString, setSearchString] = React.useState<string>("");
  const [geocodeResults, setGeocodeResults] = React.useState<GeocodeResult[]>(
    []
  );

  const geocode = async (evt: ChangeEvent<HTMLInputElement>) => {
    const s = evt.target.value;
    latestSearchString = s;
    setSearchString(s);

    setTimeout(async () => {
      // If the geocode fn gets called again, before
      // this request starts executing after the
      // setTimeout delay, this request is stale
      // and we don't want to run it.
      if (s.length > 8 && s === latestSearchString) {
        const result = await awsService.autoComplete(s, TENANT_ID);
        setGeocodeResults(result);
      }
    }, 500);
  };

  const selectLocation = (location: GeocodeResult["Place"]) => {
    setGeocodeResults([]);
    setLocation(location);
  };

  return (
    <div>
      <TextField
        name="searchString"
        variant="outlined"
        value={searchString}
        onChange={geocode}
        fullWidth
        size="small"
        placeholder={"Type here"}
      />
      {geocodeResults ? (
        geocodeResults.map((resultObj, index) => {
          const result = resultObj.Place; 
          return (
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
              <Typography>{`(${result.Geometry.Point[0]}, ${result.Geometry.Point[1]})`}</Typography>
              <Typography>{`${result.Label.split(",")[0]}`}</Typography>
              <Typography>{`${result.Label}`}</Typography>
              <Grid container justifyContent="space-between">
                <Typography>
                  {`${result.SubRegion}, ${result.Region} `}
                </Typography>
                {/* <Typography>{`${result.attributes.Addr_type}`}</Typography> */}
              </Grid>
            </div>
          );
        })
      ) : (
        <div>No Results</div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
